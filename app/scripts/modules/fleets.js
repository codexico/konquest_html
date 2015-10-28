import {game} from '../main';

function chooseDestiny(planet) {
  // todo: use x,y to calculate near planets

  // atack next planet
  let nextPlanet = planet.position + 1;
  if (nextPlanet === game.planets.length) {
    nextPlanet = 0;
  }
  return game.planets[nextPlanet];
}

export function createFleet(planet) {
    // todo: better and others algorithms
  let fleet = {};
  if (planet.ships > (10 + (game.turn * 2))) {
    fleet.ships = Math.round(Math.random() * planet.ships);
    planet.ships -= fleet.ships;
    fleet.destiny = chooseDestiny(planet);
    fleet.player = planet.player;
    game.fleets.push(fleet);
  }
  return false;
}

function fleetWin(fleet) {
  console.info('fleetwin');
  fleet.destiny.space.classList.remove(fleet.destiny.player.name);
  fleet.destiny.space.classList.add(fleet.player.name);
  fleet.destiny.ships = fleet.ships - fleet.destiny.ships;
  fleet.destiny.player.planets.pop(fleet.destiny);
  fleet.destiny.player = fleet.player;
  fleet.player.planets.push(fleet.destiny);
}

function battle(fleet) {
  if (fleet.destiny.ships > fleet.ships) {
    console.info('survive');
    fleet.destiny.ships -= fleet.ships;
  } else {
    fleetWin(fleet);
  }
}

export function arrive(fleet) {
  if (!fleet.destiny.ships) {
    console.log('empty planet');
    fleet.destiny.space.classList.add(fleet.player.name);
    fleet.destiny.ships = fleet.ships;
    fleet.destiny.player = fleet.player;
    fleet.player.planets.push(fleet.destiny);
  } else if (fleet.player === fleet.destiny.player) {
    console.log('reinforcements');
    fleet.destiny.ships += fleet.ships;
  } else {
    console.log('Battle: defense=',
      fleet.destiny.ships,
      'atack=',fleet.ships
    );
    battle(fleet);
  }
}
