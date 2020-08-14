import React, {Component} from 'react';
import Body from './Body';
import Header from './Header';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  )
}

export default App;