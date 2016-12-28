import React from 'react'
import auth from '../utils/auth.js'
import Display from './Display'

const LoginModal = props => {
  const { username, email, password,formUsernameAction, formEmailAction, formPasswordAction, loginFormErrorsAction, loginFormErrors, loginLoadingAction, loginErrorAction, loading, signinSocketAction, isRegistered, isRegisteredAction } = props;


  const handleChange = (event) =>{

    const whichTarget = () => {
      switch(event.target.name) {
        case 'username': 
          formUsernameAction(event.target.value);
          break;
        case 'email':
          formEmailAction(event.target.value);
          break;
        case 'password':
          formPasswordAction(event.target.value);
          break;
      };
    };

    if(loginFormErrors[event.target.name]){
      let errors = Object.assign({}, loginFormErrors);
      delete errors[event.target.name];
      console.log(errors)
      whichTarget();
      loginFormErrorsAction(errors);
    } else {
      whichTarget();
    };
  };

  const handleSubmit = () => {

    //form validation
    let errors = {};
    if(username === '') errors.username = "Can not be empty";
    if(!isRegistered){
      if(email.indexOf('@') === -1 && email.indexOf('.'=== -1)) errors.email = "Must be a vaild email";
    }
    if(password.length < 6) errors.password = "Password must be at least 6 characters long"
    loginFormErrorsAction(errors);

    //before sending form request to back end check to make sure there are no errors
    const isValid = Object.keys(errors).length === 0
    console.log("isValid",isValid, loginFormErrors, errors)
    if(isValid){

      //display loading signal
      loginLoadingAction(true)

      //confirm create login info and send user to next page
      auth.login(isRegistered, username, email, password, (loggedIn) => {
        console.log("loggedIn",loggedIn)
        if (!loggedIn) {
          return loginErrorAction(true)
        }

        const { location } = props
        console.log("location",location)
        if (location.state && location.state.nextPathname) {
        console.log(location.state)
          //if trying to access a authorized page after login it will redirect to the give path or go back to home
          props.router.replace(location.state.nextPathname)
        } else {
          props.router.replace('/')
        }
      })
    }

  };

  return (
    <div style={{width: 500, height: 400, backgroundColor: 'white'}}>
      {loading && <span>Loading...</span>}
      <Display if={!loading}>
        <h2>{isRegistered ? "Login" : "Sign Up"}</h2>
        <div className={`loginInput ${!!loginFormErrors.username ? "error" : ""}`}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={handleChange}
            name='username'
            value={username}
            placeholder="Enter Username"
          />
          <span>{loginFormErrors.username}</span>
        </div>
        <Display if={!isRegistered} >
          <div className={`loginInput ${!!loginFormErrors.email ? "error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={handleChange}
              name='email'
              value={email}
              placeholder="Enter Email"
            />
            <span>{loginFormErrors.email}</span>
          </div>
        </Display>
        <div className={`loginInput ${!!loginFormErrors.password ? "error" : ""}`}>
          <label htmlFor="passowrd">Password</label>
          <input
            id="passowrd"
            onChange={handleChange}
            name='password'
            value={password}
            placeholder="Enter Password"
          />
          <span>{loginFormErrors.password}</span>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={()=>isRegisteredAction(!isRegistered)}>{isRegistered ? "Register" : "Already Signed Up?" }</button>
      </Display>
    </div>
  )
}

export default LoginModal