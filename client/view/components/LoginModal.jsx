import React, { Component, PropTypes } from 'react';
import auth from '../utils/auth';
import { isValidUsername, isValidEmail, isValidPassword, errorMessages, isValidForm } from '../utils/loginUtils';

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      showRegisterForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchPath = this.switchPath.bind(this);
  }

  handleChange(event) {
    const { loginFormErrors, loginFormErrorsAction } = this.props;
    if (loginFormErrors[event.target.name]) {
      const errors = Object.assign({}, loginFormErrors);
      delete errors[event.target.name];
      this.setState({ [event.target.name]: event.target.name });
      loginFormErrorsAction(errors);
    } else {
      this.setState({ [event.target.name]: event.target.name });
    }
  }

  handleSubmit() {
    const { loginFormErrorsAction, loginLoadingAction, loginErrorAction, router, location } = this.props;
    const { username, email, password, showRegisterForm } = this.state;

    // form validation
    const errors = {};
    if (isValidUsername(username)) errors.username = errorMessages.username;
    if (showRegisterForm && isValidEmail(email)) errors.email = errorMessages.email;
    if (isValidPassword) errors.password = errorMessages.password;
    loginFormErrorsAction(errors);

    // before sending form request to back end check to make sure the form is filled out correctly
    if (isValidForm(errors)) {
      // display loading signal
      loginLoadingAction(true);
      // confirm create login info and send user to next page
      auth.login(isRegistered, username, email, password, (loggedIn) => {
        if (!loggedIn) {
          return loginErrorAction(true);
        }

        if (location.state && location.state.nextPathname) {
          // if(location.state.nextPathname === '/play'){

          // } else {
            /* trying to access an authorized page after login
            * it will redirect to the give path or go back to home
            */
            router.replace(location.state.nextPathname);
          // }
        } else {
          router.replace('/play');
        }
      });
    }
  }

  switchPath(e) {
    // e.preventDefault()
    console.log(this.state.showRegisterForm)
    const pathTo =
      `/${this.state.showRegisterForm ? 'register' : 'login'}`;
    this.setState(prevState => ({
      showRegisterForm: !prevState.showRegisterForm,
    }));
    console.log(pathTo)
    this.props.router.push(pathTo);
  }
  showPlay() {
    this.props.router.replace({
      pathname: '/play',
      state: { modal: true },
    });
  }
  renderInput(type, variable) {
    const { loginFormErrors } = this.props;
    return (
      <div className={`input ${loginFormErrors[variable] ? 'error' : ''}`}>
        <label htmlFor={type} />
        <input
          id={type}
          type={type === 'password' ? 'password' : 'text'}
          onChange={this.handleChange}
          name={type}
          value={variable}
          placeholder={`Enter ${type}`}
        />
        <span>{loginFormErrors[variable]}</span>
      </div>
    );
  }

  render() {
    const { loading, isRegistered } = this.props;
    const { username, email, password, showRegisterForm } = this.state;
    return (
      <form className="login-box" onSubmit={e => e.preventDefault()}>
        <h1 className="title">LOGIN</h1>
        {this.renderInput('username', username)}
        {showRegisterForm && this.renderInput('email', email)}
        {this.renderInput('password', password)}
        <button onClick={this.switchPath}>Register</button>
        <button className="button login" onClick={this.handleSubmit}>
          <span>GO</span><i className="fa fa-check" />
        </button>
        <div className="play">
          <button style={{ backgroundColor: 'red' }} className="playBtn" onClick={this.showPlay} />
          Play
        </div>
      </form>
    );
  }
}

LoginModal.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.object.isRequired,
  // loginFormErrors: PropTypes.object.isRequired,
  loginFormErrorsAction: PropTypes.func.isRequired,
  loginLoadingAction: PropTypes.func.isRequired,
  loginErrorAction: PropTypes.func.isRequired,
};

export default LoginModal;
