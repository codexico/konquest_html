import * as universe from './modules/universe';
import * as players from './modules/players';
import * as fleets from './modules/fleets';
import * as utils from './modules/utils';

export let game = {
  turn: 0,
  spaces: [],
  planets: [],
  players: [],
  fleets: []
};
export let defaults = {
  rows: 9,
  cols: 7,
  density: 0.2,
  players: 3,
  ships: 10,
  production: 10
};
export let ui = {};

function endTurn() {
  game.turn++;
  game.planets.forEach(function production(planet) {
    if (planet.player) {
      planet.ships += planet.production;
      // send fleet
      fleets.createFleet(planet);
    }
  });

  // todo: verify if is turn of arrival, for now all the fleets use wormholes
  // all the fleets arrive every turn
  game.fleets.forEach(fleets.arrive);
  game.fleets = [];
  utils.score();
}

function initUI() {
  ui.map = document.getElementById('map');
}

function initListeners() {
  let buttonEnd = document.querySelector('.end_turn');
  buttonEnd.addEventListener('click', endTurn);
}

(function initGame() {
  initUI();
  universe.bigBang(ui, defaults);
  game.totalSpaces = defaults.rows * defaults.cols;
  universe.initUniverse(ui, game, defaults);
  players.addPlayers();
  initListeners();
}());
