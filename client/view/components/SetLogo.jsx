import React, { Component, PropTypes } from 'react';
import GSAP from 'react-gsap-enhancer';
import { Link } from 'react-router';
import Logo from '../../images/set_logo.inline.svg';


class SetLogo extends Component {
  componentDidMount() {
    this.addAnimation(svgAnimation);
  }
  render() {
    return (
      <Link to="/" className={`logo__container ${this.props.page && 'logo__container-game'}`}><Logo className="logo" /></Link>
    );
  }
}

SetLogo.propTypes = {
  page: PropTypes.bool,
};

SetLogo.defaultProps = {
  page: false,
};

const svgAnimation = ({ target }) => {
  const logo = target.find({ className: 'logo' });
  const letters = logo.findAllInChildren();
  return new TimelineMax()
    .from(logo, 1.5, { scale: 0.2 }, 'start')
    .to(logo, 1.5, { rotation: 360, transformOrigin: '50% 50%', ease: Elastic.easeOut.config(2, 0.3) }, 'start');
};

export default GSAP(SetLogo);
