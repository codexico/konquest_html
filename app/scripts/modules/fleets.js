import {game} from '../main';

// todo: use x,y to calculate near planets
function chooseDestiny(planet) {
  // atack next planet
  let nextPlanet = game.planets.indexOf(planet) + 1;
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

function konquerPlanet(fleet) {
  let planetIndex = game.planets.indexOf(fleet.destiny);
  let planet = game.planets[planetIndex];
  let fleetPlayerIndex = game.players.indexOf(fleet.player);
  let fleetPlayer = game.players[fleetPlayerIndex];
  let oldPlayerIndex = game.players.indexOf(fleet.destiny.player);
  let oldPlayer = game.players[oldPlayerIndex];

  planet.space.className = 'space';
  planet.space.classList.add(fleet.player.name);
  planet.player = fleetPlayer;

  oldPlayer.planets.pop(planet);
  fleetPlayer.planets.push(planet);

  planet.ships = fleet.ships;
}

function occupyPlanet(fleet) {
  console.log('empty planet', fleet, fleet.destiny);
  let planetIndex = game.planets.indexOf(fleet.destiny);
  let fleetPlayerIndex = game.players.indexOf(fleet.player);

  game.planets[planetIndex].space.classList.add(fleet.player.name);
  game.planets[planetIndex].player = game.players[fleetPlayerIndex];
  game.players[fleetPlayerIndex].planets.push(game.planets[planetIndex]);
  game.planets[planetIndex].ships = fleet.ships;
}

function battle(fleet) {
  // console.log('BATTLE');
  // console.log('defense=', fleet.destiny.ships, 'atack=', fleet.ships);
  let planetIndex = game.planets.indexOf(fleet.destiny);
  let planet = game.planets[planetIndex];

  if (planet.ships >= fleet.ships) { // defense win
    planet.ships -= fleet.ships;
  } else { // attack win
    fleet.ships -= planet.ships;
    konquerPlanet(fleet);
  }
}

function reinforcements(planet, ships) {
  // console.log('reinforcements', planet, ships);
  planet.ships += ships;
}

export function arrive(fleet) {
  let planetIndex = game.planets.indexOf(fleet.destiny);
  let destinyPlanet = game.planets[planetIndex];

  if (!destinyPlanet.player) {
    occupyPlanet(fleet);
  } else if (fleet.player === destinyPlanet.player) {
    reinforcements(destinyPlanet, fleet.ships);
  } else {
    battle(fleet);
  }
}
