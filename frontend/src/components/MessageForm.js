import React from 'react';
import { Component } from 'react';
import './MessageForm.css';


class MessageForm extends Component {

  constructor(props) {
    super(props)
  }

  SendMessage = (e) => {
    //console.log('clicked')
  }
  
  render() {
    return (
      <div>
        <form id="message-form" autoComplete="off" onSubmit={this.props.onSubmitHandler}>
          <input
           id="input_txt" 
           name="message" 
           placeholder="Message"
           onChange={this.SendMessage}
           onKeyDown={this.props.onTypingHandler}
           />
          <button id="btnSendMessage">Send</button>
        </form> 
      </div>
    )
  }
}

export default MessageForm;