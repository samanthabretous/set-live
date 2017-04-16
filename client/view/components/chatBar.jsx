import React, { Component } from 'react';
import { socket } from '../../redux/actions/connections';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      socket: null,
      username: '',
      mess: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    this.state.socket.on('received message', (msg) => {
      this.setState({ messages: this.state.messages.concat(msg) });
    });
  }
  handleChange(event) {
    this.setState({ [event.target.className]: event.target.value });
  }
  submitMessage() {
    const message = {
      body: this.state.mess,
      user: this.state.username || 'guest',
    };
    this.setState({ mess: '' });
    this.state.socket.emit('new message', message);
  }
  render() {
    const { messages } = this.state;

    return (
      <section>
        <ul>
          {messages && messages.map(msg => (
            <article key={msg.id}><strong>{msg.user}</strong> <span>{msg.body}</span></article>
          ))}
        </ul>
        <input
          className="mess"
          type="text"
          placeholder="enter message"
          value={this.state.mess}
          onChange={this.handleChange}
        />
        <button onClick={this.submitMessage}>Send message</button><br />
        <input
          className="username"
          type="text"
          placeholder="choose username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={this.handleChange}>Enter Username</button>
      </section>
    );
  }
}

export default ChatBar;
