import React, { Component } from 'react';
import Space from '../Space/Space'

class Galaxy extends Component {
  renderSpace(x, y) {
    const hasPlanet = (Math.random() > 0.5) ? true : false;
    return <Space hasPlanet={hasPlanet} key={x} y={y} />;
  }
  render() {
    let rows = [];
    let cols = [];
    for (var y = 0; y < this.props.rows; y++) {
      cols = [];
      for (var x = 0; x < this.props.cols; x++) {
        cols.push(this.renderSpace(x, y));
      }
      rows.push(<div className="galaxy_row" key={y}>{cols}</div>);
    }

    return (
      <div className="galaxy">
        {rows}
      </div>
    );
  }
}

export default Galaxy;
