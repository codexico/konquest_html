import React, { Component } from 'react';

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

class Planet extends Component {
  render() {
    return (
      <span className="Planet" >
          {this.props.name}
      </span>
    );
  }
}

export default Planet;
export { createPlanets };
