import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import LoginModal from '../components/LoginModal';

import {
  formUsernameAction,
  formEmailAction,
  formPasswordAction,
  loginFormErrorsAction,
  loginErrorAction,
  loginLoadingAction,
} from '../../redux/actions/loginActions';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    formUsernameAction,
    formEmailAction,
    formPasswordAction,
    loginFormErrorsAction,
    loginErrorAction,
    loginLoadingAction,
  }, dispatch)
);

const mapStateToState = state => ({
  username: state.login.username,
  email: state.login.email,
  password: state.login.password,
  loginFormErrors: state.login.loginFormErrors,
  loading: state.login.loading,
  loginError: state.login.loginError,
});


export default withRouter(connect(mapStateToState, mapDispatchToProps)(LoginModal));
