import React from 'react';
import { Component } from 'react';
import Chat from 'twilio-chat';
import './Buttons.css';

let ACCESS_TOKEN = ''
let chatClient = ''
let chatChannel = ''
let userSelectionMenu = ''
let userSelectionMenuSelected = ''

class Buttons extends Component {
  constructor(props) {
    super(props)
  }

  GetToken = (e) => {
    console.log('clicked')
    this.GetAvailableUsers()  

    if (!userSelectionMenuSelected) {
      console.log('---->Please select a User')
      let h1Error = document.querySelector('#h1Error')
      h1Error.textContent = 'PLEASEDDDDDD'
      setInterval(() => {
          h1Error.textContent = ''
      }, 2000)
      
      return
  }   
  console.log('---->userSelectionMenuSelected', userSelectionMenuSelected)


  const getToken = () => {
      return fetch('/token/' + userSelectionMenuSelected).
      then((response) => {
          if (response.status === 200) {          
            return response.json()
          } else {
              throw new Error('Unable to fetch token')
          }
      }).then((tokenObject) => {
          return tokenObject.token
      })
  }
  getToken().then((token) => {
      ACCESS_TOKEN = token
      console.log('---->Access Token: ', ACCESS_TOKEN) 
      userSelectionMenu.remove()
      //document.querySelector('#btnGetToken').disabled = true
      //GetAvailableUsers()        
      })
  }

  CreateClientGetToken = (e) => {
    console.log('CreateClientGetTokenclicked')
    //console.log(this);
    //console.log('Chat is ----', Chat);
    //console.log('---->The Access Token is: ', ACCESS_TOKEN) 
    e.preventDefault()    

    Chat.create(ACCESS_TOKEN).then(client => { 
      chatClient = client
      console.log(chatClient)
    });

    //console.log('---->Chat client created:', chatClient)

  }

  GetPublicChannelDescr = (e) => {
    e.preventDefault()
    console.log('---->Public Channel Descriptors')
    chatClient.getPublicChannelDescriptors().then((paginator) => {      
        for (let i = 0; i < paginator.items.length; i++) {
          const channel = paginator.items[i];
          console.log('---->Channel: ' + channel.friendlyName);
          chatChannel = channel
          //console.log(chatChannel)
        }
      });
    
  }

  GetUserChannelDescr = (e) => {
    e.preventDefault()
    console.log('---->User Channel Descriptors')
    chatClient.getUserChannelDescriptors().then((paginator) => {
        console.log('Number of User Channel Descriptors: ', paginator.items.length)
        for (let i = 0; i < paginator.items.length; i++) {
          const channel = paginator.items[i];
          console.log('---->Channel: ' + channel.friendlyName);          
        }
      });  

    
  }

  JoinChannel = (e) => {
    e.preventDefault()
    console.log('---->Attempting to join chatChannel: ', chatChannel.friendlyName)
    console.log('---->Joining Channel')
    //Getting channel object from channel descriptor chatChannel
    chatChannel.getChannel().then((channel) => {
        chatChannel = channel
        console.log('---->chatChannel is now :', chatChannel)

        chatChannel.join().then((result) => {console.log('---->Joined the channel ', result)}).catch((err) => {
            console.log("Couldn't join channel " + chatChannel.friendlyName + ' because ' + err)
        }) 


        chatChannel.on('typingStarted', function(member) {
            //process the member to show typing
            console.log('typing')
            //updateTypingIndicator(member, true);
        })
        
        //set  the listener for the typing ended Channel event
        chatChannel.on('typingEnded', function(member) {
            //process the member to stop showing typing
            console.log('typing')
            //updateTypingIndicator(member, false);
        })
    })

    chatClient.on('channelJoined', (channel) => {
        console.log('---->Joined channel message (from on channelJoined):' + channel.friendlyName);
    });

    chatClient.on('messageAdded', (message) => {
        console.log('---->messages added ', message.body);
        let divOutput = document.querySelector('#output')
        divOutput.insertAdjacentHTML('beforeend', '<p>' + message.dateUpdated.toLocaleString() + '  ' + message.author + '  ' + message.body + '</p>')
    })
    
  }

  LeaveChannel = (e) => {
    e.preventDefault()
    console.log('---->Leave Channel')
    chatChannel.leave().then((result) => {
        console.log('---->Left the channel ' + result.friendlyName)
        
        
    }).then(this.userleft).catch((err) => {
    console.log("Couldn't leave channel " + chatChannel.friendlyName + ' because ' + err)
    }) 
    
  }

  GetMessages = (e) => {
    e.preventDefault()
    console.log('---->Get Messages')
    // Get Messages for a previously created channel
    chatChannel.getMessages(50).then(function(messages) {        
        let divOutput = document.querySelector('#output')
        const totalMessages = messages.items.length
        for (let i = 0; i < totalMessages; i++) {
        const message = messages.items[i];
        divOutput.insertAdjacentHTML('beforeend', '<p>' + message.author + '  ' + message.body + '</p>')        
      }
      console.log('---->Total Messages:' + totalMessages);
    });
    
  }

 
 
 GetAvailableUsers = () => {
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
        let divUsers = document.querySelector('#users-list')
        if (userSelectionMenu) {
            userSelectionMenu.remove()
        }
        let h1Error = document.querySelector('#h1Error')
        h1Error.textContent = 'PLEASE SELECT USER'
        userSelectionMenu = document.createElement("select")
        userSelectionMenu.id = 'userSelectionMenuId'
        userSelectionMenu.name = 'selecteduser'
        userSelectionMenu.size = availableUsers.length

        availableUsers.map((user, i) => {
            const option = document.createElement("option")
            option.value = user.username
            option.text = user.username
            userSelectionMenu.add(option, null)
        })
        divUsers.appendChild(userSelectionMenu)
        //document.querySelector("#userSelectionMenuId").focus()


        document.querySelector('#userSelectionMenuId').addEventListener('click', (e) => {
            //e.preventDefault()    
            userSelectionMenuSelected = e.target.value 
            document.querySelector('#btnGetToken').textContent = '1-Get Token'
            console.log('---->userSelectionMenuId', userSelectionMenuSelected)
        })

        console.log(userSelectionMenu)

        //return result
    })
  }

  userleft = () => {
    let availableUsers = '' 
    return fetch('/userleft/' + userSelectionMenuSelected)
    .then((response) => {
        if (response.status === 200) {          
            return response.json()
        } else {
            throw new Error('Unable to fetch token')
        }
    }).then((result) => {
        userSelectionMenuSelected = ''
        console.log('---->User left', result)
        //return result
    })
}


  
  render() {
    return (
      <div id="buttons">
            <button id="btnGetToken" onClick={this.GetToken}>1-Choose User</button>
            <button id="btnCreateClientGetToken" onClick={this.CreateClientGetToken}>2-Create Client</button>
            <button id="btnGetPublicChannelDescr" onClick={this.GetPublicChannelDescr}>3-Get Public Channel Descriptors</button>
            <button id="btnGetUserChannelDescr" onClick={this.GetUserChannelDescr}>4-Get User Channel Descriptors</button>
            <button id="btnJoinChannel" onClick={this.JoinChannel}>5-Join Channel</button>
            <button id="btnLeaveChannel" onClick={this.LeaveChannel}>6-Leave Channel</button>
            <button id="btnGetMessages" onClick={this.GetMessages}>7-Get Messages</button>    
      </div>

    )
  }
}

export default Buttons;
