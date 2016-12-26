import React from 'react'
import classnames from 'classnames'
import auth from '../utils/auth.js'

const LoginModal = props => {
  const { username, email, password,formUsernameAction, formEmailAction, formPasswordAction, formErrorsAction, formErrors, loginLoadingAction, loginErrorAction, loading, signinSocketAction } = props;


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

    if(formErrors[event.target.name]){
      let errors = Object.assign({}, formErrors);
      delete errors[event.target.name];
      console.log(errors)
      whichTarget();
      formErrorsAction(errors);
    } else {
      whichTarget();
    };
  };

  const handleSubmit = () =>{

    //form validation
    let errors = {};
    if(username === '') errors.username = "Can not be empty";
    if(email.indexOf('@') === -1 && email.indexOf('.'=== -1)) errors.email = "Must be a vaild email";
    if(password.length < 6) errors.password = "Password must be at least 6 characters long"
    formErrorsAction(errors);

    //before sending form request to back end check to make sure there are no errors
    const isValid = Object.keys(errors).length === 0
    if(isValid){

      //display loading signal
      loginLoadingAction(true)

      //confirm create login info and send user to next page
      auth.login(username, email, password, (loggedIn) => {
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
          this.props.router.replace('/')
        }
      })
    }

  };

  return (
    <div style={{width: 500, height: 400, backgroundColor: 'white'}}>
      {loading && <span>Loading...</span>}
      <div className={classnames('loginInput', {
        error: !!formErrors.username
      })}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={handleChange}
          name='username'
          value={username}
          placeholder="Enter Username"
        />
        <span>{formErrors.username}</span>
      </div>
      <div className={classnames('loginInput', {
        error: !!formErrors.email
      })}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={handleChange}
          name='email'
          value={email}
          placeholder="Enter Email"
        />
        <span>{formErrors.email}</span>
        </div>
      <div className={classnames('loginInput', {
        error: !!formErrors.password
      })}>
        <label htmlFor="passowrd">Password</label>
        <input
          id="passowrd"
          onChange={handleChange}
          name='password'
          value={password}
          placeholder="Enter Password"
        />
        <span>{formErrors.password}</span>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default LoginModal