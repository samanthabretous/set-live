import React from 'react';
import { Link, withRouter } from 'react-router'
import {RouteTransition} from 'react-motion'
import auth from '../utils/auth'

import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';

//components
import GameMenu from './GameMenu'
import Modal from './Modal'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn()
    }
    //const {params, children, loginModalAction, loginModal} = this.props
  }
  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }
  
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  //show login/resigter modal
  setLoginModal() {
    this.props.router.push('/login')
  }

  render() {
    let { location } = this.props

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )
    return (
      <div className={`app ${(this.props.params.room ? "game" : "")}`}>

        <div className={this.props.params.room ? "gameMenu" : ""}>
          <div className={this.props.params.room ? "logoTransition" : "set_logo"}>
            <SetLogo /> 
          </div> 
          <Link to={{
            pathname: '/user/1',
            state: { modal: true, returnTo: this.props.location.pathname }
          }}> Login </Link>
          {this.props.params.room && <GameMenu {...this.props}/>}
        </div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        
          <li><Link to="/">Home</Link> (changes depending on auth status)</li>
          <li><Link to="/play">Play Game</Link> (authenticated)</li>
        </ul>
        <div>

          <div>
            {isModal ?
              this.previousChildren :
              this.props.children
            }

            {isModal && (
              <Modal isOpen={true} returnTo={location.state.returnTo}>
                {this.props.children}
              </Modal>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App


