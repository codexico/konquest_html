import React, { Component } from 'react';
import Planet from '../Planet/Planet'

class Space extends Component {
  render() {
    return (
      <button className="space" >
        <Planet />
      </button>
    );
  }
}

export default Space;
