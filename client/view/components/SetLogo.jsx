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
      <Link to="/"><Logo className={this.props.page ? 'logo__game' : 'logo__home'} /></Link>
    );
  }
}

SetLogo.propTypes = {
  page: PropTypes.string,
};

SetLogo.defaultProps = {
  page: '',
};

const svgAnimation = ({ target }) => {
  const logo = target.find({ className: 'logo' });
  const letters = logo.findAllInChildren();
  return new TimelineMax()
    .from(logo, 1.5, { scale: 0.2 }, 'start')
    .to(logo, 1.5, { rotation: 360, transformOrigin: '50% 50%', ease: Elastic.easeOut.config(1, 0.3) }, 'start');
};

export default GSAP(SetLogo);
