import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Modal = (props) => {
  let closeModal = () =>{
  }
  return (
    <ReactCSSTransitionGroup 
      transitionName={props.transitionName}    
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className="modal">
        {props.children}
      </div>
    </ReactCSSTransitionGroup>
  )
}

export default Modal;