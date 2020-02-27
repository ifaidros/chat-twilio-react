import React from 'react';
import { Component } from 'react';
import './Buttons.css';



class Buttons extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id="buttons">
            <button id="btnGetToken" onClick={this.props.GetTokenHandler}>1-Choose User</button>
            <button id="btnCreateClientGetToken" onClick={this.props.CreateClientGetTokenHandler}>2-Create Client</button>
            <button id="btnGetPublicChannelDescr" onClick={this.props.GetPublicChannelDescrHandler}>3-Get Public Channel Descriptors</button>
            <button id="btnGetUserChannelDescr" onClick={this.props.GetUserChannelDescrHandler}>4-Get User Channel Descriptors</button>
            <button id="btnJoinChannel" onClick={this.props.JoinChannelHandler}>5-Join Channel</button>
            <button id="btnLeaveChannel" onClick={this.props.LeaveChannelHandler}>6-Leave Channel</button>
            <button id="btnGetMessages" onClick={this.props.GetMessagesHandler}>7-Get Messages</button>    
      </div>

    )
  }
}

export default Buttons;
