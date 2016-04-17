import './helpers/polyfills';
import * as fleets from './modules/fleets';
import * as game from './modules/game';
import * as planets from './modules/planets';
import * as players from './modules/players';
import * as universe from './modules/universe';

let defaults = {
    rows: 9,
    cols: 7,
    density: 0.2,
    players: 5,
    ships: 10,
    production: 10
};

export let state = {
    turn: 0,
    spaces: [],
    planets: [],
    players: [],
    fleets: []
};
export let ui = {};
export let options = {};

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
    return ui.buttonEnd.addEventListener('click', endTurn);
}

function initOptions() {
    // will merge defaults with options from the user
    return defaults;
}

function init() {
    options = initOptions();
    ui = initUI();

    universe.bigBang(ui, options);
    universe.initUniverse(ui, options);
    players.addPlayers();
    ui.listeners = initListeners(ui);
}

init();
