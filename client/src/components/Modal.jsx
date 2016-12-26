import React from 'react'
import {TransitionMotion, interpolatingStyle, spring} from 'react-motion'

const Modal = props =>{
  return (
    <div>
      Modal
      {props.children}
    </div>
  )
}

export default Modal;
