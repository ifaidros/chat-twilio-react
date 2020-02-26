import React from 'react';
import { Component } from 'react';
import './App.css';
import './UserList';
import './ChatMessages';
import UserList from './UserList';
import ChatMessages from './ChatMessages';
import MessageForm from './MessageForm';
import Buttons from './Buttons';


class App extends Component {

  handleToken = () => {
    console.log('button clicked')
    let availableUsers = '' 
    fetch('/users')
    .then((response) => {
        if (response.status === 200) {          
            return response.json()
        } else {
            throw new Error('Unable to fetch token')
        }
    }).then((availableUsers) => {
        console.log('---->Available Users:', availableUsers)
    })     
  };
  
  render() {
    return (
      <div className="container">
        <div className="header-div">
          <h2>Chat with Twilio</h2>  
        </div>

        <UserList handleToken={this.handleToken}/>
        <ChatMessages />
        <MessageForm />
        <Buttons />
      </div>
    )
  }
}

export default App;
