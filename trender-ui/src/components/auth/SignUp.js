import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../../style/auth/SignIn.css';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmation: null,
    error: null
  }

  async usernameIsAvailable(tentativeUsername) {
    var usernames = await fetch("api/users/")
    usernames = await usernames.json();
    usernames = await usernames.filter(user => user.username == tentativeUsername);
    const available = usernames.length == 0;
    console.log('USERNAMES', usernames, 'AVAILABLE', available, this.state.password, this.state.confirmation)
    return available;
  }

  passwordSpeltCorrectly = () => {
    return (this.state.password == this.state.confirmation);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let usernameIsAvailable = await this.usernameIsAvailable(this.state.username);
    let passwordSpeltCorrectly = this.passwordSpeltCorrectly();
    this.outputError(usernameIsAvailable, passwordSpeltCorrectly);
  }

  outputError(usernameIsAvailable, passwordSpeltCorrectly) {
    if (usernameIsAvailable == true && passwordSpeltCorrectly == true) {
      let payload = {
        username: this.state.username,
        password: this.state.password
      }
      axios.post('api/users', payload)
        .then(this.setState({
          error: 'ok'
        })
        ).catch(err =>
        this.setState({
          error: "Network error. Try again later."
        })
      );
    } else if (usernameIsAvailable == true && passwordSpeltCorrectly == false) {
      this.setState({
        error: "Error when typing password's confirmation"
      })
    } else if (usernameIsAvailable == false && passwordSpeltCorrectly == true) {
      this.setState({
        error: "The username isn't available. Pick another username."
      })
    } else {
      console.log('USERNAMEISVAIALABLE', usernameIsAvailable, 'PASSWORDSPELT', passwordSpeltCorrectly)
      this.setState({
        error: "Username unavailable and/or incorrect password"
      })
    }
  }

  render() {
    return this.state.error == 'ok' ?
    (
      <Redirect to="/signin" />
    ):
    (
    <div className="container">
      <div className="signUp">
        <form onSubmit={ this.handleSubmit } className="white">
          <h5 id="signUpTitle">Sign Up</h5>
          <div className="input-field">
            <input type="text" id="username" placeholder="Username" onChange={ this.handleChange } maxLength="20"/>
          </div>
          <div className="input-field">
            <input type="password" id="password" placeholder="Password" onChange={ this.handleChange } maxLength="20"/>
          </div>
          <div className="input-field">
            <input type="password" id="confirmation" placeholder="Confirm your password" onChange={ this.handleChange } maxLength="20"/>
          </div>
          <div className="input-field">
            <button id="sign" type="submit">Sign Up</button>
          </div>
        </form>
        <p id="errorMessage">{ this.state.error }</p>
      </div>
      </div>
    )
  }
}

export default SignUp;