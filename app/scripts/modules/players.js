import {game, defaults, ui} from './game';

function createLife(planet, player) {
  planet.space.classList.add(player.name);
  planet.ships = defaults.ships;
  planet.production = defaults.production; // override random production
  planet.player = player;
  player.planets = [];
  player.planets.push(planet);
}

// players
function createPlayer() {
  let player = document.createElement('span');
  player.name = 'player_' + game.players.length;
  player.className = 'player ' + player.name;
  game.players.push(player);
  return game.players[game.players.length - 1];
}

function getEmptyPlanet() {
  let planet = game.planets[Math.floor(Math.random() * game.planets.length)];
  if (!planet.ships) {
    return planet;
  }
  // try again
  return getEmptyPlanet();
}

function addPlayer() {
  createLife(getEmptyPlanet(), createPlayer());
}

export function addPlayers() {
  game.players = [];
  for (var i = 0; i < defaults.players; i++) {
    addPlayer();
  }
}
