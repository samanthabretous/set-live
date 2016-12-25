import React from 'react'
import classnames from 'classnames'

const LoginModal = props => {
  const { username, email, password,formUsernameAction, formEmailAction, formPasswordAction, loginErrorsAction, loginErrors } = props;


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

    if(loginErrors[event.target.name]){
      let errors = Object.assign({}, loginErrors);
      delete errors[event.target.name];
      console.log(errors)
      whichTarget();
      loginErrorsAction(errors);
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
    loginErrorsAction(errors);

  };
  return (
    <div style={{width: 500, height: 400, backgroundColor: 'white'}}>
      <div className={classnames('loginInput', {
        error: !!loginErrors.username
      })}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={handleChange}
          name='username'
          value={username}
          placeholder="Enter Username"
        />
        <span>{loginErrors.username}</span>
      </div>
      <div className={classnames('loginInput', {
        error: !!loginErrors.email
      })}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          onChange={handleChange}
          name='email'
          value={email}
          placeholder="Enter Email"
        />
        <span>{loginErrors.email}</span>
        </div>
      <div className={classnames('loginInput', {
        error: !!loginErrors.password
      })}>
        <label htmlFor="passowrd">Password</label>
        <input
          id="passowrd"
          onChange={handleChange}
          name='password'
          value={password}
          placeholder="Enter Password"
        />
        <span>{loginErrors.password}</span>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default LoginModal