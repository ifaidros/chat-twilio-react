import React from 'react';
import { Component } from 'react';
import './ChatMessages.css';


class ChatMessages extends Component {
  
  render() {
    return (
      <div id="chat-messages">
        <div id="output"></div>   
      </div>
    )
  }
}

export default ChatMessages;
