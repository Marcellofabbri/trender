import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/signIn.js';
import { Redirect, useHistory } from "react-router-dom";
import { SignUp } from './SignUp.js';
import { resetSelectedChart } from '../../actions/resetSelectedChart.js';
import '../../style/auth/SignIn.css';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
    this.props.resetSelectedChart();
  }

  render() {
    const { authError, username } = this.props;
    return username != null ?
    (
      <Redirect to="/" />
    ) :
    (
      <div className="container">
        <div className="signIn">
          <form onSubmit={ this.handleSubmit } className="white">
            <h5 id="signInTitle">Sign In</h5>
            <div className="input-field">
              <input type="text" id="username" onChange={ this.handleChange } placeholder="Username" />
            </div>
            <div className="input-field">
              <input type="password" id="password" onChange={ this.handleChange } placeholder="Password" />
            </div>
            <div className="input-field">
              <button id="sign">Log In</button>
            </div>
            <div>
              { authError ? <p id="errorMessage">{authError}</p> : null }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authError: state.auth.authError,
    username: state.auth.username,
    redux: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
    resetSelectedChart: () => dispatch(resetSelectedChart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);