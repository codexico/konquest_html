import { game, defaults } from '../main';
import { getEmptyPlanet } from './planets';

function createLife(planet, player) {
  planet.space.classList.add(player.name);
  planet.ships = defaults.ships;
  planet.production = defaults.production; // override random production
  planet.player = player;
  player.planets = [];
  player.planets.push(planet);
}

function createPlayer() {
  let player = document.createElement('span');
  player.name = 'player_' + game.players.length;
  player.className = 'player ' + player.name;
  game.players.push(player);
  return game.players[game.players.length - 1];
}

function addPlayer() {
  createLife(getEmptyPlanet(), createPlayer());
}

export function addPlayers() {
  for (var i = 0; i < defaults.players; i++) {
    addPlayer();
  }
}
