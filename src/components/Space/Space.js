import React, { Component } from 'react';
import Planet from '../Planet/Planet'

class Space extends Component {
  getPlanet() {
    return <Planet />;
  }

  render() {
    return (
      <button className="space" >
        {this.props.hasPlanet && this.getPlanet()}
      </button>
    );
  }
}

export default Space;
