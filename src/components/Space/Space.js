import React, { Component } from 'react';
import Planet from '../Planet/Planet';

function createSpace(x, y, i) {
  return {x, y, i};
}

class Space extends Component {
  getPlanet() {
    return <Planet />;
  }

  render() {
    return (
      <button className="space" >
        {this.props.planet}
      </button>
    );
  }
}

export default Space;
export { createSpace };
