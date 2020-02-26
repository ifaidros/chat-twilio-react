import React from 'react';
import { Component } from 'react';
import './MessageForm.css';


class MessageForm extends Component {

  SendMessage = (e) => {
    console.log('clicked')
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')
  }
  
  render() {
    return (
      <div id="message-form">
        <form id="message-form" autocomplete="off" onSubmit={this.onSubmit}>
          <input
           id="input_txt" 
           name="message" 
           placeholder="Message"
           onChange={this.SendMessage}
           />
          <button id="btnSendMessage">Send</button>
        </form> 
      </div>
    )
  }
}

export default MessageForm;