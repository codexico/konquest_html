import './helpers/polyfills';
import * as fleets from './modules/fleets';
import * as game from './modules/game';
import * as planets from './modules/planets';
import * as players from './modules/players';
import * as universe from './modules/universe';

let defaults = {
    rows: 14,
    cols: 10,
    density: 0.2,
    players: 5,
    ships: 10,
    production: 10
};
let options = {};
let ui = {};
let state = {
    turn: 0,
    spaces: [],
    planets: [],
    players: [],
    fleets: []
};

function initUI() {
    return {
        map: document.getElementById('map'),
        buttonEnd: document.querySelector('.end_turn')
    };
}

function endTurn() {
    game.endTurn(state, planets, fleets);
}

function initListeners() {
    ui.buttonEnd.addEventListener('click', endTurn);
}

function initOptions() {
    // will merge defaults with options from the user
    return defaults;
}

function init() {
    options = initOptions();
    ui = initUI();

    universe.bigBang(ui, options);
    universe.initUniverse(ui, options, state);
    players.addPlayers(options, state);
    initListeners();
}

init();
