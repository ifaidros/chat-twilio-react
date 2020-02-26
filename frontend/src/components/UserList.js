import React from 'react';
import { Component } from 'react';
import './UserList.css';


class UserList extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="users-list">
        <h2>UserList!</h2> 
        <button
        onClick={this.props.handleToken}
        >
        Get Token?
        </button>
      </div>

    )
  }
}

export default UserList;
