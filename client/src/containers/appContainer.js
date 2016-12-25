import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import App from '../components/App'
import {
  loginModalAction,
  formUsernameAction,
  formEmailAction,
  formPasswordAction,
  loginErrorsAction
} from '../actions'


const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    loginModalAction,
    formUsernameAction,
    formEmailAction,
    formPasswordAction, 
    loginErrorsAction,
  }, dispatch)
)

const mapStateToState = state => ({
  loginModal: state.game.loginModal,
  username: state.game.username,
  email: state.game.email,
  password: state.game.password,
  loginErrors: state.game.loginErrors,
})


export default connect(mapStateToState, mapDispatchToProps)(App)