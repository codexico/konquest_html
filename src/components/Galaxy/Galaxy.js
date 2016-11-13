import React, { Component } from 'react';
import Space from '../Space/Space'

class Galaxy extends Component {
  renderSpace(x, y, i) {
    const hasPlanet = !!(Math.random() > 0.5);
    return <Space hasPlanet={hasPlanet} key={i} x={x} y={y} />;
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
