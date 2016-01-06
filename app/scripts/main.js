import * as universe from './modules/universe';
import * as planets from './modules/planets';
import * as players from './modules/players';
import * as fleets from './modules/fleets';
import * as utils from './modules/utils';
import * as game from './modules/game';

export let state = {
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

function initUI() {
  return {
    map: document.getElementById('map'),
    buttonEnd: document.querySelector('.end_turn')
  };
}

function endTurn() {
  game.endTurn(state, planets, fleets, utils);
}

function initListeners() {
  return ui.buttonEnd.addEventListener('click', endTurn);
}

(function initstate() {
  ui = initUI();
  universe.bigBang(ui, defaults);
  state.totalSpaces = defaults.rows * defaults.cols;
  universe.initUniverse(ui, state, defaults);
  players.addPlayers();
  ui.listeners = initListeners(ui);
}());
