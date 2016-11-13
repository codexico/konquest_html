import React, { Component } from 'react';
import Galaxy, { createGalaxy } from '../Galaxy/Galaxy';

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

    const galaxy = createGalaxy(this.defaults);
    this.state = {
        spaces: galaxy.spaces,
        planets: galaxy.planets
    };
  }

  render() {
    return (
      <div className="game">
        <Galaxy
          spaces={this.state.spaces}
          planets={this.state.planets}
          />
        <div className="order">
        </div>
      </div>
    );
  }
}

export default Game;
