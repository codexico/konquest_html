import React, { Component } from 'react';
import Planet from '../Planet/Planet'

class Space extends Component {
  getPlanet(hasPlanet) {
    return hasPlanet ? <Planet /> : null;
  }

  render() {
    return (
      <button className="space" >
        {this.getPlanet(this.props.hasPlanet)}
      </button>
    );
  }
}

export default Space;
