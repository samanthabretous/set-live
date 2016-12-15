import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Modal = (props) => {
  console.log(props.transitionName)
  return (
    <ReactCSSTransitionGroup 
      transitionName="modal-anim"    
      transitionEnterTimeout={600}
      transitionLeaveTimeout={600}
    >
      {props.children}
    </ReactCSSTransitionGroup>
  )
}

export default Modal;