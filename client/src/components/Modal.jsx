import React from 'react';
import {Link} from 'react-router';
import GSAP from 'react-gsap-enhancer';

class Modal extends React.Component{

  componentDidMount() {
    this.addAnimation(appearAnim)
  }

  render() {
    return (
      <div className="modal">
        {this.props.children}
      </div>
    )
  }
}

export default GSAP(Modal)

const appearAnim = ({target}) => {
   return TweenMax.from(target, 0.53, {
      y: -34,
      opacity: 0,
      scale: 0.82,
      ease: Back.easeOut
   })
}

 const styles = {
    position: 'fixed',
    top: '20%',
    right: '20%',
    bottom: '20%',
    left: '20%',
    boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
  }
