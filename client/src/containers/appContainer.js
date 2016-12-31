import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import App from '../components/App'
import {
  loginModalAction,
  formUsernameAction,
  formEmailAction,
  formPasswordAction,
  loginErrorsAction,
  loginLoadingAction,
  signinSocketAction,
} from '../actions/loginActions'


const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    loginModalAction,
    formUsernameAction,
    formEmailAction,
    formPasswordAction, 
    loginErrorsAction,
    loginLoadingAction,
    signinSocketAction,
  }, dispatch)
)

const mapStateToState = state => ({
  loginModal: state.login.loginModal,
  username: state.login.username,
  email: state.login.email,
  password: state.login.password,
  loginErrors: state.login.loginErrors,
  loading: state.login.loading,
  gameId: state.game.gameId,
  deck: state.game.deck,
})


export default withRouter(connect(mapStateToState, mapDispatchToProps)(App))