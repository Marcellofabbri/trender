import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';

const Start = () => {
  const history = useHistory();

  const redirectToSignIn = (e) => {
    e.preventDefault();
    history.push("/signin");
  }

  const redirectToRegister = (e) => {
    e.preventDefault();
    history.push("/signup");
  }

  return(
    <div className="Start">
      <button onClick={ redirectToSignIn }>Sign In</button>
      <button onClick={ redirectToRegister }>Register</button>
    </div>
  )
}

export default Start;