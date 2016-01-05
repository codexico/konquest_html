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
  players: 5,
  ships: 10,
  production: 10
};
export let ui = {};

function grow(planet) {
  planet.ships += planet.production;
  return planet;
}

function wishToSendFleet(planet) {
  // todo: better and others algorithms
  return planet.ships > (10 + (game.turn * 2));
}

function isOcuppied(planet) {
  return planet.player;
}

function prepateTurn() {
  game.planets
    .filter(isOcuppied)
    .map(grow)
    .filter(wishToSendFleet)
    .map(fleets.createFleet);
}

function executeTurn() {
  // todo: verify if is turn of arrival, for now all the fleets use wormholes
  // all the fleets arrive every turn
  game.fleets.forEach(fleets.arrive);
  game.fleets = [];
}

function endTurn() {
  game.turn++;

  console.groupCollapsed('turn ', game.turn);
  prepateTurn();
  console.log('game.fleets', game.fleets);
  executeTurn();
  console.groupEnd();
  
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
