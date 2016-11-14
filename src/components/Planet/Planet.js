import React, { Component } from 'react';
import './Planet.css';
import randomColor from 'randomcolor';

function getRandomLetter() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

class Planet extends Component {
  render() {
    const planetStyle = {
        color: randomColor({luminosity: 'dark'}),
        backgroundColor: randomColor({luminosity: 'bright'})
    };

    return (
      <span className="Planet" >
          <span className="planet_body"
              style={planetStyle}
              >{getRandomLetter()}</span>
          <span className="planet_name">{this.props.name}</span>
          <span className="planet_ships">{this.props.ships}</span>
      </span>
    );
  }
}

export default Planet;
