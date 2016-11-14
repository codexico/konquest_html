import React, { Component } from 'react';
import './Planet.css';
import randomColor from 'randomcolor';

function getRandomLetter() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function createPlanet(name, ships, production) {
  return {ships, production, name: name};
}

function createPlanets(numPlanets, ships, production) {
  const planets = [];

  for (var i = 0; i < numPlanets; i++) {
    planets.push(createPlanet(i, ships, production));
  }

  return planets;
}

function getEmptyPlanet(planets) {
    const planetIndex = (Math.floor(Math.random() * planets.length));

    if (!planets[planetIndex].player) {
        return planets[planetIndex];
    }
    // try again
    return getEmptyPlanet(planets);
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
      </span>
    );
  }
}

export default Planet;
export { createPlanets, getEmptyPlanet };
