import React, { Component } from 'react';
import Space from '../Space/Space';
import {createSpace} from '../Space/Space';
import { createPlanets } from '../Planet/Planet';

function getEmptySpace(spaces) {
    const row = (Math.floor(Math.random() * spaces.length));
    const col = (Math.floor(Math.random() * spaces[0].length));

    if (!spaces[row][col].planet) {
        return {row, col};
    }
    // try again
    return getEmptySpace(spaces);
}

function createGalaxySpaces(rows, cols) {
  let galaxy = [];
  let rowSpaces = [];
  let index = 0;
  for (var y = 0; y < rows; y++) {
    rowSpaces = [];

    for (var x = 0; x < cols; x++) {
      rowSpaces.push(createSpace(x, y, index++));
    }

    galaxy.push(rowSpaces);
  }
  return galaxy;
}

function createGalaxy(options) {
  const galaxy = {};
  const numPlanets = Math.floor(options.rows * options.cols * options.density);

  galaxy.spaces = createGalaxySpaces(options.rows, options.cols);
  galaxy.planets = createPlanets(numPlanets, options.ships, options.production);

  galaxy.planets.forEach((planet) => {
      const {row, col} = getEmptySpace(galaxy.spaces);
      galaxy.spaces[row][col].planet = planet;
  })

  return galaxy;
}

class Galaxy extends Component {

  renderSpace(space) {
    return (
        <Space
            planet={space.planet}
            key={space.i} x={space.x} y={space.y} />
    );
  }

  renderGalaxy(spaces) {
    return spaces.map((row, y) => {
        const rowSpaces = row.map((space) => {
            return this.renderSpace(space);
        });
        return (
          <div className="galaxy_row" key={y}>{rowSpaces}</div>
        );
    });
  }

  render() {
    return (
      <div className="galaxy">
        {this.renderGalaxy(this.props.spaces)}
      </div>
    );
  }
}

export default Galaxy;
export { createGalaxy, createGalaxySpaces };
