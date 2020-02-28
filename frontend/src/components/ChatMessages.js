import React from 'react';
import { Component } from 'react';
import './ChatMessages.css';


class ChatMessages extends Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight
    console.log('updated')
  }
  
  render() {
    return (
      <div id="chat-messages" ref={(node) => (this.node = node)}>
        <div id="output" >
          {this.props.messages.map((message) => {
            //return message.dateUpdated.toLocaleString()
            let divOutput = document.querySelector('#output')
            divOutput.insertAdjacentHTML('beforeend', '<p>' + message.dateUpdated.toLocaleString() + '  ' + message.author + '  ' + message.body + '</p>')
            //divOutput.scrollIntoView()



          })
          }
        </div>   
      </div>
    )
  }
}

export default ChatMessages;



        
        // let divOutput = document.querySelector('#output')
        // divOutput.insertAdjacentHTML('beforeend', '<p>' + message.dateUpdated.toLocaleString() + '  ' + message.author + '  ' + message.body + '</p>')
        // divOutput.scrollIntoView()