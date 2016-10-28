import App from '../components/App'
import {connect} from 'react-redux'

const appToState = state => ({
  status: state.status,
})


export default connect(appToState)(App)