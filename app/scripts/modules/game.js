import {logScore} from './utils';
import {resetFleetForm} from './fleets';

function growPlanets(state, planets) {
    state.planets
    .filter(planets.isOccupied)
    .map(planets.growPlanet);
}

function prepareComputerTurn(state, planets, fleets) {
    state.planets
    .filter(planets.isOccupiedByComputer)
    .filter((planet) => {
        return planets.wishToSendFleet(state, planet);
    })
    .map((planet) => {
        fleets.createComputerFleet(state, planet);
    });
}

function prepateTurn(state, planets, fleets) {
    growPlanets(state, planets);
    prepareComputerTurn(state, planets, fleets);
}

function executeTurn(state, fleets) {
    // todo: verify if is turn of arrival, for now all the fleets use wormholes
    // all the fleets arrive every turn
    state.fleets.map((fleet) => {
        return fleets.arrive(state, fleet);
    });
    state.fleets = [];

    state.sourcePlanet = null;
    state.destinyPlanet = null;
    resetFleetForm();

}

export function endTurn(state, planets, fleets) {
    let turn = {};
    turn.index = state.turns.length;
    turn.state = Object.create(state);
    state.turns.push(turn);

    console.groupCollapsed('turn ', turn.index);
    prepateTurn(state, planets, fleets);
    console.log('state.fleets', state.fleets);
    executeTurn(state, fleets);
    console.groupEnd();

    logScore(state);
}
