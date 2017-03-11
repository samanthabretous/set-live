import React, { Component, PropTypes } from 'react';
import GSAP from 'react-gsap-enhancer';

class Modal extends Component {

  componentDidMount() {
    this.addAnimation(appearAnim);
  }

  render() {
    return (
      <div className="modal">
        {this.props.children}
      </div>
    );
  }
}

export default GSAP(Modal);

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

const appearAnim = ({ target }) => (
  TweenMax.from(target, 0.53, {
    y: -34,
    opacity: 0,
    scale: 0.82,
    ease: Back.easeOut,
  })
);
