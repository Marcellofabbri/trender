import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/signIn.js';

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
    this.props.signIn(this.state)
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={ this.handleSubmit } className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={ this.handleChange } />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={ this.handleChange } />
          </div>
          <div className="input-field">
            <button>Log In</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);