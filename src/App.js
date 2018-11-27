import React, { Component } from 'react';
import GameArea from './components/GameArea';
import Header from './components/Header';
import './assets/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <GameArea />
      </div>
    );
  }
}

export default App;
