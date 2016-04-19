import {chooseDestiny} from './utils';

function generateFleet(state, planet) {
    let fleet = {};
    fleet.ships = Math.round(Math.random() * planet.ships);
    fleet.destiny = chooseDestiny(state, planet);
    fleet.player = planet.player;
    return fleet;
}

export function createFleet(state, planet) {
    let fleet = generateFleet(state, planet);
    planet.ships -= fleet.ships;
    state.fleets.push(fleet);
    return fleet;
}

function konquerPlanet(state, fleet) {
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let planet = state.planets[planetIndex];
    let fleetPlayerIndex = state.players.indexOf(fleet.player);
    let fleetPlayer = state.players[fleetPlayerIndex];
    let oldPlayerIndex = state.players.indexOf(fleet.destiny.player);
    let oldPlayer = state.players[oldPlayerIndex];

    planet.space.className = 'space';
    planet.space.classList.add(fleet.player.name);
    planet.player = fleetPlayer;

    oldPlayer.planets.pop(planet);
    fleetPlayer.planets.push(planet);

    planet.ships = fleet.ships;
}

function occupyPlanet(state, fleet) {
    console.log('empty planet', fleet, fleet.destiny);
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let fleetPlayerIndex = state.players.indexOf(fleet.player);

    state.planets[planetIndex].space.classList.add(fleet.player.name);
    state.planets[planetIndex].player = state.players[fleetPlayerIndex];
    state.players[fleetPlayerIndex].planets.push(state.planets[planetIndex]);
    state.planets[planetIndex].ships = fleet.ships;
}

function battle(state, fleet) {
    // console.log('BATTLE');
    // console.log('defense=', fleet.destiny.ships, 'atack=', fleet.ships);
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let planet = state.planets[planetIndex];

    if (planet.ships >= fleet.ships) { // defense win
        planet.ships -= fleet.ships;
    } else { // attack win
        fleet.ships -= planet.ships;
        konquerPlanet(state, fleet);
    }
}

function reinforcements(planet, ships) {
    // console.log('reinforcements', planet, ships);
    planet.ships += ships;
}

export function arrive(state, fleet) {
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let destinyPlanet = state.planets[planetIndex];

    if (!destinyPlanet.player) {
        occupyPlanet(state, fleet);
    } else if (fleet.player === destinyPlanet.player) {
        reinforcements(destinyPlanet, fleet.ships);
    } else {
        battle(state, fleet);
    }
}
