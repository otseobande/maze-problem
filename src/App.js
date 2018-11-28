import React, { Component } from 'react';
import ActionArea from './components/ActionArea';
import Header from './components/Header';
import './assets/app.css';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ActionArea />
      </>
    );
  }
}

export default App;
