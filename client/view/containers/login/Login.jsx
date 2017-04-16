import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { checkFormValidations, isValidForm } from './loginUtils';
import auth from '../../utils/auth';

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToState = state => ({
  state,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: 'test1',
      email: '',
      password: 'password1',
      loginErrors: {},
      errors: {},
      showRegisterForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchPath = this.switchPath.bind(this);
  }

  handleChange(event) {
    const { loginErrors } = this.state;
    const { name, value } = event.target;
    if (loginErrors[name]) {
      const errors = Object.assign({}, loginErrors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors,
      });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit() {
    const { router, location } = this.props;
    const { username, email, password, showRegisterForm } = this.state;

    // form validation
    const errors = checkFormValidations(username, email, password, showRegisterForm);
    this.setState({ errors });

    // before sending form request to back end check to make sure the form is filled out correctly
    if (isValidForm(errors)) {
      // confirm create login info and send user to next page
      auth.login(!showRegisterForm, username, email, password, (loggedIn) => {
        if (!loggedIn) {
          this.state.errors.unsucessfulLogin = true;
          return;
        }
        if (location.state && location.state.nextPathname) {
          router.replace(location.state.nextPathname);
        } else {
          router.replace('/play');
        }
      });
    }
  }

  switchPath() {
    const pathTo =
      `/${this.state.showRegisterForm ? 'login' : 'register'}`;
    this.setState(prevState => ({
      showRegisterForm: !prevState.showRegisterForm,
    }));
    this.props.router.push(pathTo);
  }

  renderInput(type, variable) {
    const { loginErrors } = this.state;
    return (
      <div className={`login__input-container ${loginErrors[variable] ? 'error' : ''}`}>
        <div className="login__input-inner">
          <label htmlFor={type}>{type.toUpperCase()}:</label>
          <span>{loginErrors[variable]}</span>
        </div>
        <input
          className="login__input"
          type={type === 'password' ? 'password' : 'text'}
          onChange={this.handleChange}
          name={type}
          value={this.state[type]}
          placeholder={`Enter ${type}`}
        />
      </div>
    );
  }

  render() {
    const { username, email, password, showRegisterForm, errors } = this.state;
    return (
      <form
        className="login"
        onSubmit={e => e.preventDefault()}
      >
        <fieldset>
          <legend>
            <button
              onClick={this.switchPath}
              className={!showRegisterForm && 'active'}
            >
              Login
            </button>
            <button
              onClick={this.switchPath}
              className={showRegisterForm && 'active'}
            >
              Register
            </button>
          </legend>
          <div className="login__main">
            {this.renderInput('username', username)}
            {showRegisterForm && this.renderInput('email', email)}
            {this.renderInput('password', password)}
            <button
              className="login__button login__button-go" onClick={this.handleSubmit}
            >
              {showRegisterForm ? 'REGISTER' : 'LOGIN'}
            </button>
            {errors.unsucessfulLogin && <h1>NOT LOGGED IN</h1>}
          </div>
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(connect(mapStateToState, mapDispatchToProps)(Login));
