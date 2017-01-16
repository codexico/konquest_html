import React, { Component } from 'react';
import './Player.css';
import { isOccupied } from '../Planet/Planet';
import { nextArrayItem, random, clone } from '../../modules/helpers';

function chooseDestiny(planets, planet) {
    // todo: more and better algorithms
    // todo: use x,y to calculate near planets
    return nextArrayItem(planets, planet);
}

function createComputerFleet(planet, destiny) {
    const fleet = {};
    const planetClone = clone(planet);
    fleet.ships = Math.floor(Math.random() * planetClone.ships);
    fleet.destiny = destiny;
    fleet.player = planetClone.player;
    return {planetClone, fleet};
}

// todo: better and others algorithms
function wishToSendFleet(ships, turn, random) {
    const planetBaseFleet = 10;
    const minGrow = 2;
    const planetMinFleet = planetBaseFleet + (turn * minGrow);

    if (ships > planetMinFleet) {
        return random() > 0.3;
    }

    return false;
}

function createComputerFleets(originalPlanets, turn) {
    const fleets = [];
    const planets = originalPlanets
    .map((planet) => {
        if (isOccupied(planet) && wishToSendFleet(planet.ships, turn, random)) {
            const fleet = createComputerFleet(planet, chooseDestiny(originalPlanets, planet));
            fleets.push(fleet);
            planet.ships = planet.ships - fleet.ships;
        }
        return planet;
    });
    console.log(planets);
    return {planets, fleets};
}

class Player extends Component {
    playerStyles() {
        const colors = [
            'rgba(191, 11, 41, 0.7)',
            'rgba(196, 243, 255, 0.7)',
            'rgba(84, 234, 184, 0.7)',
            'rgba(244, 190, 73, 0.7)',
            'rgba(122, 108, 204, 0.7)',
            'rgba(176, 25, 193, 0.7)'
        ]

        const styles = {
            backgroundColor: colors[this.props.player.order]
        };
        return styles;
    }
    render() {
        return (
            <span className="Player" style={this.playerStyles()}></span>
        );
    }
}

export default Player;
export { createComputerFleets };


export const test = (process.env.NODE_ENV === 'test')
  ? {
      wishToSendFleet,
      createComputerFleet,
      chooseDestiny
  }
  : null
