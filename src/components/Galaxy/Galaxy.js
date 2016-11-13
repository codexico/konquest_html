import React, { Component } from 'react';
import Space from '../Space/Space';
import {createSpace} from '../Space/Space';
import Planet, { createPlanets } from '../Planet/Planet';

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

  return galaxy;
}

class Galaxy extends Component {

  getPlanet(x, y, i) {
    return <Planet key={i} x={x} y={y} />;
  }

  renderSpace(x, y, i) {
    const planet = (Math.random() > 0.5) ? this.getPlanet(x, y, i) : null;
    return <Space planet={planet} key={i} x={x} y={y} />;
  }

  renderGalaxy(spaces) {
    let index = 0;

    return spaces.map((row, y) => {
        const rowSpaces = row.map((space, x) => {
            return this.renderSpace(x, y, index++);
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
