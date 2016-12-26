import React from 'react'
import { withRouter } from 'react-router'
import auth from '../utils/auth.js'

const Login = React.createClass({
  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props
      console.log(location.state)

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
        console.log(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{width: 500, height:500, backgroundColor: 'blue'}}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" defaultValue="password1"/></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }

})

export default withRouter(Login)