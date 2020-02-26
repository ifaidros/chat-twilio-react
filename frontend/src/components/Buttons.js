import React from 'react';
import { Component } from 'react';
import './Buttons.css';


class Buttons extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="buttons">
            <button id="btnGetToken">1-Choose User</button>
            <button id="btnCreateClientGetToken">2-Create Client</button>
            <button id="btnGetPublicChannelDescr">3-Get Public Channel Descriptors</button>
            <button id="btnGetUserChannelDescr">4-Get User Channel Descriptors</button>
            <button id="btnJoinChannel">5-Join Channel</button>
            <button id="btnLeaveChannel">6-Leave Channel</button>
            <button id="btnGetMessages">7-Get Messages</button>    
      </div>

    )
  }
}

export default Buttons;
