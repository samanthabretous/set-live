import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import LoginModal from '../components/LoginModal'
import {
  formUsernameAction,
  formEmailAction,
  formPasswordAction,
  formErrorsAction,
  loginErrorAction,
  loginLoadingAction,
  signinSocketAction,
} from '../actions/loginActions'


const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    formUsernameAction,
    formEmailAction,
    formPasswordAction, 
    formErrorsAction,
    loginErrorAction,
    loginLoadingAction,
    signinSocketAction,
  }, dispatch)
)

const mapStateToState = state => ({
  username: state.login.username,
  email: state.login.email,
  password: state.login.password,
  formErrors: state.login.formErrors,
  loading: state.login.loading,
  error: state.login.error,
})


export default withRouter(connect(mapStateToState, mapDispatchToProps)(LoginModal))