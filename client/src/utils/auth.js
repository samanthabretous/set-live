import $ from 'jquery'

module.exports = {
  login(isRegister, username, email, password, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      console.log(localStorage.token)
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    const isAuthenicated = (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    }
    if(isRegister){
      signInRequest(username, password, isAuthenicated)
    } else {
      console.log("we made it")
      signUpRequest(username, email, password, isAuthenicated)
    }
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

  onChange: function () {
    console.log("onChange")
    // $.ajax({
    //   url: '/api/playerInfo',
    //   beforeSend: function (xhr) {
    //     xhr.setRequestHeader('Authorization', this.getToken());
    //   },
    // })
  }
}

const signInRequest = (username, password, cb) => {

  //go to the back end and check if the user credentials are correct
  $.ajax({
    url: '/api/login', 
    type: 'POST',
    data: {
      username,
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
    }, 2500)
  })
}

const signUpRequest = (username, email, password, cb) =>{
  //go to back end and register player and get token
  $.ajax({
    url: '/api/signup', 
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
    }, 2500)
  })
}