import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../style/User.css';
import {signOut} from '../actions/signOut.js';

class User extends Component {

  render() {
    return(
      <div className="user">
        <h5>Logged in as { this.props.username }</h5>
        <button onClick={ this.props.signOut }>Log out</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => { dispatch(signOut()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);