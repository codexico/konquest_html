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
    turns: [],
    spaces: [],
    planets: [],
    players: [],
    fleets: []
};

function initUI() {
    return {
        map: document.getElementById('map'),
        buttonEnd: document.querySelector('.end_turn'),
        fleetForm: document.getElementById('fleet-form')
    };
}

function endTurn() {
    game.endTurn(state, planets, fleets);
}

function resetFleetForm(fleetForm) {
    fleetForm.reset();
    fleetForm['fleet-size'].disabled = true;
    let els = fleetForm.querySelectorAll('.planet_data-data');
    Array.prototype.map.call(els, (el) => {
        el.innerHTML = '';
    });
}

function onSubmitFleetForm(e) {
    fleets.createHumanFleet(e, state);
    state.sourcePlanet = undefined;
    state.destinyPlanet = undefined;

    resetFleetForm(e.target);
}

function initListeners() {
    ui.buttonEnd.addEventListener('click', endTurn);
    ui.fleetForm.addEventListener('submit', onSubmitFleetForm);
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
