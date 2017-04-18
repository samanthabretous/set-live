import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import auth from '../login/auth';
// components
import { Modal, SetLogo } from '../../components';


const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const mapStateToState = state => ({
  gameId: state.gameId,
  deck: state.deck,
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

  updateAuth(loggedIn) {
    this.setState({ loggedIn: !!loggedIn });
  }

  render() {
    const { location, children } = this.props;
    const shrinkLogo = location.pathname.includes('play') || location.pathname.includes('game');
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );
    return (
      <main className="app">
        <SetLogo page={shrinkLogo} />

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
