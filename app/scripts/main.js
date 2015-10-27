import {game, defaults, ui} from './modules/game';
import * as universe from './modules/universe';
import * as players from './modules/players';
import * as fleets from './modules/fleets';

function endTurn() {
  game.turn++;
  game.planets.forEach(function production(planet) {
    if (planet.player) {
      planet.ships += planet.production;
      // send fleet
      createFleet(planet);
    }
  });

  // todo: verify if is turn of arrival, for now all the fleets use wormholes
  // all the fleets arrive every turn
  game.fleets.forEach(arrive);
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
