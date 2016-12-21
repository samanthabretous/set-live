import React from 'react'
import {TransitionSpring} from 'react-motion'

const Modal = (props) => {
  return (
    <TransitionSpring>
      {props.children}
    </TransitionSpring>
  )
}

export default Modal;