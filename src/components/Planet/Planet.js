import React, { Component } from 'react';
import './Planet.css';


function isOccupied(planet) {
    return planet.player;
}

function growPlanets(planets) {
    return planets
    .filter(isOccupied)
    .map((planet) => {
        planet.ships = planet.ships + planet.production;
        return planet;
    });
}

class Planet extends Component {
  render() {
    return (
      <span className="Planet" >
          <span className="planet_body"
              style={this.props.style}
              >{this.props.body}</span>
          <span className="planet_name">{this.props.name}</span>
          <span className="planet_ships">{this.props.ships}</span>
      </span>
    );
  }
}

export default Planet;
export { growPlanets, isOccupied };
