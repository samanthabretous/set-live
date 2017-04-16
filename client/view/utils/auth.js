import $ from 'jquery';
import store from '../../redux/store';
import { socket } from '../../redux/actions/connections';
import { SET_PLAYER_INFO } from '../../redux/actions/types';

module.exports = {
  login(isRegister, username, email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    const isAuthenicated = (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        socket.emit('authenticate', { token: res.token.split(' ')[1] });
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    };
    if (isRegister) {
      signInRequest(username, password, isAuthenicated);
    } else {
      signUpRequest(username, email, password, isAuthenicated);
    }
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  getPlayerSecretInfo() {
    $.ajax({
      url: '/api/playerInfo',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', localStorage.token);
      },
    })
    .done((data) => {
      const { success, playerInfo } = data;
      if (success) {
        store.dispatch({
          type: SET_PLAYER_INFO,
          playerInfo,
        });
      }
    });
  },
  getPlayerInfo() {
    socket.emit('getPlayerInfo', { token: localStorage.token });
  },
  getGameInfo(gameId) {
    socket.emit('isGameStarted', { gameId, token: localStorage.token });
  },
  onChange() {
  },
};

const signInRequest = (username, password, cb) => {
  // go to the back end and check if the user credentials are correct
  $.ajax({
    url: '/api/login',
    type: 'POST',
    data: {
      username,
      password,
    },
  })
  .done((data) => {
    setTimeout(() => {
      if (data) {
        cb({
          authenticated: data.success,
          token: data.token,
        });
      } else {
        cb({ authenticated: false });
      }
    }, 500);
  });
};

const signUpRequest = (username, email, password, cb) =>{
  // go to back end and register player and get token
  $.ajax({
    url: '/api/signup',
    type: 'POST',
    data: {
      username,
      email,
      password,
    },
  })
  .done((data) => {
    setTimeout(() => {
      if (data) {
        cb({
          authenticated: data.success,
          token: data.token,
        });
      } else {
        cb({ authenticated: false });
      }
    }, 500);
  });
};
