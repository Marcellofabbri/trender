import React, {Component} from 'react';
import Body from './Body';
import Header from './Header';
import Start from './Start';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './auth/SignIn.js';
import SignUp from './auth/SignUp.js';
import '../style/App.css';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Switch>
            <Route path="/start" component={ Start } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/signup" component={ SignUp } />
            <Route exact path="/" component={ Body } />

          </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;