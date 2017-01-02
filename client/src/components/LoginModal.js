import React from 'react'
import {Link, withRouter} from 'react-router'
import auth from '../utils/auth.js'
import Display from './Display'
import GSAP from 'react-gsap-enhancer';
 
class LoginModal extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.switchAnim = this.addAnimation(switchAnim)
  }

  getCurrentPage() {
    return this.props.location.pathname.indexOf('register') === -1
      ? 'login'
      : 'register'
  }

  componentDidUpdate() {
     this.switchAnim.tweenTo(this.getCurrentPage())
  }


  handleChange(event) {
    const {loginFormErrors, loginErrorAction, formUsernameAction, formEmailAction, formPasswordAction, username, email, password} = this.props

    const whichTarget = () => {
      switch(event.target.name) {
        case 'username': 
          formUsernameAction(event.target.value);
          break;
        case 'email':
          formEmailAction(event.target.value);
          break;
        case 'password':
          formPasswordAction(event.target.value);
          break;
      };
    };

    if(loginFormErrors[event.target.name]){
      let errors = Object.assign({}, loginFormErrors);
      delete errors[event.target.name];
      whichTarget();
      loginFormErrorsAction(errors);
    } else {
      whichTarget();
    };
  };

  handleSubmit() {
    const { username, email, password,loginFormErrorsAction, loginLoadingAction, loginErrorAction, isRegistered, router, location } = this.props;

    //form validation
    let errors = {};
    if(username === '') errors.username = "Can not be empty";
    if(!isRegistered){
      if(email.indexOf('@') === -1 && email.indexOf('.'=== -1)) errors.email = "Must be a vaild email";
    }
    if(password.length < 6) errors.password = "Password must be at least 6 characters long"
    loginFormErrorsAction(errors);

    //before sending form request to back end check to make sure there are no errors
    const isValid = Object.keys(errors).length === 0
    if(isValid){

      //display loading signal
      loginLoadingAction(true)

      //confirm create login info and send user to next page
      auth.login(isRegistered, username, email, password, (loggedIn) => {
        if (!loggedIn) {
          return loginErrorAction(true)
        }

        if (location.state && location.state.nextPathname) {

          if(location.state.nextPathname === '/play'){

          } else {
            //if trying to access a authorized page after login it will redirect to the give path or go back to home
            router.replace(location.state.nextPathname)
          }
        } else {
          props.router.replace('/')
        }
      })
    }

  };
  
  renderInput(type, variable) {
    const { loginFormErrors, username, email, password } = this.props;
    return (
    <div className={`input ${!!loginFormErrors[variable] ? "error" : ""}`}>
      <label htmlFor={`${type}`}></label>
      <input
        id={type}
        onChange={this.handleChange.bind(this)}
        name={`${type}`}
        value={variable}
        placeholder={`Enter ${type}`}
      />
      <span>{loginFormErrors[variable]}</span>
    </div>
  )}

  switchPath(){
    const pathTo =
      `/${this.getCurrentPage() === 'register' ? 'login' : 'register'}`
    this.props.router.replace({
      pathname: pathTo,
      state: { modal: true}
    })
  }

  render() {

    const { username, email, password, loading, isRegistered } = this.props;

    return (
      <div className="materialContainer">

        <div className="box">
          <div className="title">LOGIN</div>
          {this.renderInput('username', username)}
          {this.renderInput('password')}
          <div className="button login">
             <button onClick={this.handleSubmit.bind(this)}><span>GO</span><i className="fa fa-check"></i></button>
          </div>
          <a href="" className="pass-forgot">Forgot your password?</a>
        </div>

       <div className="overbox">
          <div onClick={this.switchPath.bind(this)}>
            <div name="switch" className="material-button alt-2">
               <span className="shape"/>
            </div>
          </div>
          <div className="register-content">
            <div className="title">REGISTER</div>
            {this.renderInput('username', username)}
            {this.renderInput('email', email)}
            {this.renderInput('password', password)}
            <div className="button">
              <button onClick={this.handleSubmit.bind(this)}><span>NEXT</span></button>
            </div>
          </div>
       </div>
       <div className="play">
        Play
       </div>

      </div>
    )
  }
}

export default GSAP(LoginModal)


function switchAnim({target}) {
   const shape = target.find({className: 'shape'})
   const box = target.find({className: 'box'})
   const registerContent = target
      .find({className: 'register-content'})
      .findAllInChildren()
      console.log(registerContent)
   const switchButton = target.find({name: 'switch'})

   return new TimelineMax()
      .pause()
      .add('login')
      .to(switchButton, 0.3, {
        left: '160px',
        top: '160px',
        ease: Sine.easeInOut,
      }, 'login')
      .add('middle')
      .to(switchButton, 0.4, {
         left: '0px',
         width: '100%',
         height: '100%',
         top: '0',
         borderRadius: '10px',
         ease: Sine.easeInOut,
      })
      .to(box, 0.4, {
         scale: 0.94,
         y: '-=29',
         ease: Sine.easeInOut,
      }, 'middle')
      .staggerFromTo(registerContent, 0.32, {scale: 0.95}, {scale: 1, autoAlpha: 1}, 0.032)
      .to(shape, 0.55, {
         xPercent: 43,
         yPercent: -43,
         rotation: 45,
         ease: Sine.easeInOut,
      }, 'middle')
      .add('register')
}