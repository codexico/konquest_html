import React, { Component } from 'react';
import Space from '../Space/Space';
import {createSpace} from '../Space/Space';
import Planet from '../Planet/Planet';


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

class Galaxy extends Component {

  getPlanet(x, y, i) {
    return <Planet key={i} x={x} y={y} />;
  }

  renderSpace(x, y, i) {
    const planet = (Math.random() > 0.5) ? this.getPlanet(x, y, i) : null;
    return <Space planet={planet} key={i} x={x} y={y} />;
  }

  renderGalaxy() {
    let galaxy = [];
    let rowSpaces = [];
    let index = 0;
    for (var y = 0; y < this.props.rows; y++) {
      rowSpaces = [];
      for (var x = 0; x < this.props.cols; x++) {

        rowSpaces.push(this.renderSpace(x, y, index++));
      }
      galaxy.push(
        <div className="galaxy_row" key={y}>{rowSpaces}</div>
      );
    }
    return galaxy;
  }

  render() {
    return (
      <div className="galaxy">
        {this.renderGalaxy()}
      </div>
    );
  }
}

export default Galaxy;
export { createGalaxySpaces };
