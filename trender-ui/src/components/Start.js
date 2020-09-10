import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';
import '../style/auth/Start.css';
import { connect } from 'react-redux';
import {wipeAuthError} from '../actions/wipeAuthError.js';

const Start = (props) => {
  const history = useHistory();

  const redirectToSignIn = (e) => {
    e.preventDefault();
    props.wipeAuthError();
    history.push("/signin");
  }

  const redirectToRegister = (e) => {
    e.preventDefault();
    props.wipeAuthError();
    history.push("/signup");
  }

  return(
    <div className="container">
      <div className="Start">
        <button id="goToSignIn" onClick={ redirectToSignIn }>Sign In</button>
        <br/>
        <button id="goToSignUp" onClick={ redirectToRegister }>Register</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    wipeAuthError: () => { dispatch(wipeAuthError()) }
  }
}

export default connect(null, mapDispatchToProps)(Start);