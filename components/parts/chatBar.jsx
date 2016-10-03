import React from 'react'
import io from 'socket.io-client';
const socket = io("http://localhost:3000");

const ChatBar = React.createClass({
  getInitialState(){
    return {
      messages: [], 
      socket: socket, 
      username: "",
      mess: ""
    }
  },
  componentDidMount(){
    var self = this;
    this.state.socket.on('received message', function(msg) {
      console.log(msg)
      self.setState({messages: self.state.messages.concat(msg)})
    })
  },
  handleChange(event){
    this.setState({[event.target.className]: event.target.value})
  },
  submitMessage(){
    var message ={
      body: this.state.mess,
      user: this.state.username || "guest"
    }
    this.setState({mess: ""})
    this.state.socket.emit('new message', message)
  },
  render(){
    var self = this;
    if(this.state.messages){
      var messages = this.state.messages.map(function(msg,i){
        return <li key={i}><strong>{msg.user}</strong> <span>{msg.body}</span></li>
      })
    }
    return(
      <div>
        <ul>
          {messages}
        </ul>
        <input 
          className="mess" 
          type="text" 
          placeholder="enter message"
          value={this.state.mess} 
          onChange={this.handleChange}/>
        <button onClick={self.submitMessage}>Send message</button><br/>
        <input 
          className="username" 
          type="text" 
          placeholder="choose username" 
          value={this.state.username}
          onChange={this.handleChange}/>
        <button onClick={self.handleChange}>Enter Username</button>
      </div>
    )
  }
})
export default ChatBar