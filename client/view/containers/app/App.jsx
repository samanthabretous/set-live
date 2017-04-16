import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import auth from '../../utils/auth';
import {
  loginModalAction,
  loginErrorsAction,
  loginLoadingAction,
  signinSocketAction,
} from '../../../redux/actions/loginActions';
// components
import { Modal, SetLogo } from '../../components';


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loginModalAction,
    loginErrorsAction,
    loginLoadingAction,
    signinSocketAction,
  }, dispatch)
);

const mapStateToState = state => ({
  loginModal: state.login.loginModal,
  loginErrors: state.login.loginErrors,
  loading: state.login.loading,
  gameId: state.game.gameId,
  deck: state.game.deck,
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: auth.loggedIn(),
    };
  }
  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this);
    auth.login();
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
    console.log(this.props.router)
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );
    return (
      <main className="app">
        <SetLogo page={this.props.params.room} />

        {isModal ?
          this.previousChildren :
          children
        }

        {isModal && (
          <Modal isOpen returnTo={location.state.returnTo}>
            {children}
          </Modal>
        )}
      </main>
    );
  }
}

App.propTypes = {
  params: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(connect(mapStateToState, mapDispatchToProps)(App));
