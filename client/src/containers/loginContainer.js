import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import LoginModal from '../components/LoginModal'
import {
  formUsernameAction,
  formEmailAction,
  formPasswordAction,
  loginErrorsAction,
  loginLoadingAction,
  signinSocketAction,
} from '../actions/loginActions'


const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    formUsernameAction,
    formEmailAction,
    formPasswordAction, 
    loginErrorsAction,
    loginLoadingAction,
    signinSocketAction,
  }, dispatch)
)

const mapStateToState = state => ({
  username: state.login.username,
  email: state.login.email,
  password: state.login.password,
  loginErrors: state.login.loginErrors,
  loading: state.login.loading,
})


export default withRouter(connect(mapStateToState, mapDispatchToProps)(LoginModal))