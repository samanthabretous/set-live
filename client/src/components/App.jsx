import React from 'react';
import { Link, withRouter } from 'react-router'
import auth from '../utils/auth'

import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';

//components
import GameMenu from './GameMenu'
import LoginModal from './LoginModal'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn()
    }
    //const {params, children, loginModalAction, loginModal} = this.props
  }
  
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    })
  }

  componentWillMount() {
    console.log(this)
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  //show login/resigter modal
  setLoginModal() {
    this.props.router.push('/login')
    //this.props.loginModalAction(!this.props.loginModal)
  }

  render() {
    console.log(this.props)
    return (
      <div className={"app " + (this.props.params.room ? "game" : "")}>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/how-to-play">About</Link></li>
          <li><Link to="/">Home</Link> (changes depending on auth status)</li>
          <li><Link to="/page2">Page Two</Link> (authenticated)</li>
          <li><Link to="/user/foo">User: Foo</Link> (authenticated)</li>
        </ul>
        <div className={this.props.params.room ? "gameMenu" : ""}>
          <div className={this.props.params.room ? "logoTransition" : "set_logo"}>
            <SetLogo /> 
          </div> 
          <button onClick={this.setLoginModal.bind(this)}>Login</button>
          {this.props.loginModal && <LoginModal {...props}/>}
          {this.props.params.room && <GameMenu {...props}/>}
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default App


