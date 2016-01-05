import { game } from '../main';
import { chooseDestiny } from './utils';

function generateFleet(planet) {
  let fleet = {};
  fleet.ships = Math.round(Math.random() * planet.ships);
  fleet.destiny = chooseDestiny(planet);
  fleet.player = planet.player;
  return fleet;
}

export function createFleet(planet) {
  let fleet = generateFleet(planet);
  planet.ships -= fleet.ships;
  game.fleets.push(fleet);
  return fleet;
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
