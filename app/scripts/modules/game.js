import {logScore} from './utils';

function prepateTurn(state, planets, fleets) {

    state.planets
    .filter(planets.isOcuppied)
    .map(planets.grow)
    .filter((planet) => {
        return planets.wishToSendFleet(state, planet);
    })
    .map((planet) => {
        return fleets.createFleet(state, planet);
    });
}

function executeTurn(state, fleets) {
    // todo: verify if is turn of arrival, for now all the fleets use wormholes
    // all the fleets arrive every turn
    state.fleets.map((fleet) => {
        return fleets.arrive(state, fleet);
    });
    state.fleets = [];
}

export function endTurn(state, planets, fleets) {
    state.turn += 1;

    console.groupCollapsed('turn ', state.turn);
    prepateTurn(state, planets, fleets);
    console.log('state.fleets', state.fleets);
    executeTurn(state, fleets);
    console.groupEnd();

    logScore(state);
}
