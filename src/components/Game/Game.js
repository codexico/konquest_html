import React, { Component } from 'react';
import Galaxy, { createGalaxySpaces } from '../Galaxy/Galaxy';
import { createPlanets } from '../Planet/Planet';

function createUniverse(options) {
  const galaxy = {};
  const numPlanets = Math.floor(options.rows * options.cols * options.density);

  galaxy.spaces = createGalaxySpaces(options.rows, options.cols);

  galaxy.planets = createPlanets(numPlanets, options.ships, options.production);

  return galaxy;
}

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

    createUniverse(this.defaults);
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
