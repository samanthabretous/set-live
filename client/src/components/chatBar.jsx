import React from 'react';
import { socket } from '../actions/connections';

const ChatBar = React.createClass({
  getInitialState() {
    return {
      messages: [],
      socket,
      username: '',
      mess: '',
    };
  },
  componentDidMount() {
    this.state.socket.on('received message', (msg) => {
      this.setState({ messages: this.state.messages.concat(msg) });
    });
  },
  handleChange(event) {
    this.setState({ [event.target.className]: event.target.value });
  },
  submitMessage() {
    const message = {
      body: this.state.mess,
      user: this.state.username || 'guest',
    };
    this.setState({ mess: '' });
    this.state.socket.emit('new message', message);
  },
  render() {
    const self = this;
    if (this.state.messages) {
      var messages = this.state.messages.map((msg, i) => (
        <li key={i}><strong>{msg.user}</strong> <span>{msg.body}</span></li>
      ));
    }
    return (
      <div>
        <ul>
          {messages}
        </ul>
        <input
          className="mess"
          type="text"
          placeholder="enter message"
          value={this.state.mess}
          onChange={this.handleChange}
        />
        <button onClick={self.submitMessage}>Send message</button><br />
        <input
          className="username"
          type="text"
          placeholder="choose username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={self.handleChange}>Enter Username</button>
      </div>
    );
  },
});
export default ChatBar