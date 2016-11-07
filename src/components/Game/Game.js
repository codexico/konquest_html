import React, { Component } from 'react';
import Galaxy from '../Galaxy/Galaxy'

class Game extends Component {
  constructor(props) {
    super(props);
    this.defaults = {
      rows: 14,
      cols: 10,
      density: 0.2,
      players: 5,
      ships: 10,
      production: 10
    };
    this.state = {
      planets: []
    };
  }

  render() {
    return (
      <div className="game">
        <Galaxy
          rows={this.defaults.rows}
          cols={this.defaults.cols}
          planets={this.state.planets}
          />
        <div className="order">
        </div>
      </div>
    );
  }
}

export default Game;
