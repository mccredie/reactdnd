import React, { Component } from 'react';

import Game from './Game';

import './App.css';

class App extends Component {
  state = {
    cards: [
      {status: Game.UNRANKED, name: "foo"},
      {status: Game.UNRANKED, name: "bar"}
    ]
  };

  handleCardsUpdated = cards => this.setState({cards})

  render = () => (
      <div className="App">
        <Game cards={this.state.cards} onCardsUpdated={this.handleCardsUpdated}></Game>
      </div>
  )
}

export default App;
