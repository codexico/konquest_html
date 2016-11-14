import React, { Component } from 'react';
import Space from '../Space/Space';

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
