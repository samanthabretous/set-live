import React from 'react';
import { Link } from 'react-router';
import GSAP from 'react-gsap-enhancer';
import auth from '../utils/auth';
import SetLogo from '../../images/set_logo.inline.svg';

// components
import Modal from './Modal';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: auth.loggedIn(),
    };
    // const {params, children, loginModalAction, loginModal} = this.props
  }
  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this);
    auth.login();
  }

  componentDidMount() {
    this.addAnimation(svgAnimation);
  }
  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }

  // show login/resigter modal
  setLoginModal() {
    this.props.router.push('/login');
  }

  updateAuth(loggedIn) {
    this.setState({ loggedIn: !!loggedIn });
  }

  render() {
    const { location, children } = this.props;

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );
    return (
      <div className="app">
        <div className={this.props.params.room ? 'game_logo' : 'set_logo'}>
          {location.pathname !== '/' ? <Link to="/"> <SetLogo className="small_logo" /></Link> : <SetLogo className="logo" />
          }
        </div>
        <div>

          <div>
            {isModal ?
              this.previousChildren :
              children
            }

            {isModal && (
              <Modal isOpen returnTo={location.state.returnTo}>
                {children}
              </Modal>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default GSAP(App);

const svgAnimation = ({ target }) => {
  const logo = target.find({ className: 'logo' });
  const letters = logo.findAllInChildren();
  return new TimelineMax()
    .from(logo, 1.5, { scale: 0.2 }, 'start')
    .to(logo, 1.5, { rotation:360, transformOrigin: '50% 50%', ease: Elastic.easeOut.config(1, 0.3) }, 'start');
};
