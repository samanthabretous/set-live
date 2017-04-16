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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchPath = this.switchPath.bind(this);
  }

  getCurrentPage() {
    return this.props.location.pathname.indexOf('register') === -1
      ? 'login'
      : 'register';
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
    const { username, email, password } = this.state;

    const isRegistered = this.getCurrentPage() === 'login';
    // form validation
    const errors = {};
    if (isValidUsername(username)) errors.username = errorMessages.username;
    if (!isRegistered && isValidEmail(email)) errors.email = errorMessages.email;
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

  switchPath() {
    const pathTo =
      `/${this.getCurrentPage() === 'register' ? 'login' : 'register'}`;
    this.props.router.replace({
      pathname: pathTo,
      state: { modal: true },
    });
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
    const { username, email, password } = this.state;
    return (
      <form className="materialContainer" onSubmit={e => e.preventDefault()}>
        <h1 className="title">LOGIN</h1>
        {this.renderInput('username', username)}
        {!this.getCurrentPage && this.renderInput('email', email)}
        {this.renderInput('password', password)}
        <button onClick={this.switchPath}>Register</button>
        <button className="button login" onClick={this.handleSubmit}>
          <span>GO</span><i className="fa fa-check" />
        </button>
        <a href="" className="pass-forgot">Forgot your password?</a>

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
  loginFormErrors: PropTypes.object.isRequired,
  loginFormErrorsAction: PropTypes.func.isRequired,
  loginLoadingAction: PropTypes.func.isRequired,
  loginErrorAction: PropTypes.func.isRequired,
};

export default LoginModal;
