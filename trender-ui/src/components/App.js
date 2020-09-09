import React, {Component} from 'react';
import Body from './Body';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './auth/SignIn.js';
import SignUp from './auth/SignUp.js';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Switch>
            <Route path="/signin" component={ SignIn } />
            <Route path="/" component={ Body } />
            <Route path="/signup" component={ SignUp } />
          </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;