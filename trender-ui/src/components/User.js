import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../style/User.css';
import {signOut} from '../actions/signOut.js';

class User extends Component {

  render() {
    return(
      <div className="user">
        <div id="sentenceAndName">
          <h5 id="sentence">Logged in as </h5><h3 id="nameOfUser">{ this.props.username }</h3>
        </div>
        <button id="logout" onClick={ this.props.signOut }>LOGOUT</button>
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