import $ from 'jquery'

module.exports = {
  login(username, email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    signInRequest(username, email, pass, (res) => {
      console.log('res', res)
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken: function () {
    return localStorage.token
  },

  logout: function (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn: function () {
    return !!localStorage.token
  },

  onChange: function () {}
}

function signInRequest(username, email, password, cb) {

  //go to the back end and check if the user credentials are correct
  $.ajax({
    url: '/api/authenticate', 
    type: 'POST',
    data: {
      username,
      email,
      password
    }
  })
  .done(data =>{
    console.log(data)
    setTimeout(() => {
      if (data) {
        cb({
          authenticated: data.success,
          token: data.token
        })
      } else {
        cb({ authenticated: false })
      }
    }, 5000)
  })
}