import React from 'react';
import { Component } from 'react';
import './UserList.css';


class UserList extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id="users-list">
        <h3>Available Users:</h3>
        <h1 id="h1Error"></h1>
        <button
        onClick={this.props.handleToken}
        >
        Want token?
        </button>
        <div> hello</div>
        <button
        onClick={this.props.handleToken}
        >
        Get it!
        </button>
      </div>

    )
  }
}

export default UserList;
