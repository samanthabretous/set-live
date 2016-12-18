import React from 'react';
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';


const App = (props) => {
  console.log(props.params.room)
  return (
    <div className="app">
      <div className={(props.params.room ? "logoTransition" : "set_logo")}>
        <SetLogo /> 
      </div> 
      <ReactCSSTransitionGroup 
        transitionName="pageSlider"
        transitionEnterTimeout={600} 
        transitionLeaveTimeout={600}>
        {props.children}
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default App


