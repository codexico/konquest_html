import {chooseDestiny, isOccupier} from './utils';

function updateShips(planet, shipsNum) {
    planet.ships = shipsNum;
    planet.shipsEl.innerHTML = shipsNum;
}

export function createHumanFleet(e, state) {
    let fleet = {};
    fleet.ships = parseInt(e.target['fleet-size'].value, 10);
    updateShips(state.sourcePlanet, state.sourcePlanet.ships - fleet.ships);
    fleet.destiny = state.destinyPlanet;
    fleet.player = state.sourcePlanet.player;
    state.fleets.push(fleet);
}

export function resetFleetForm() {
    let fleetForm = document.getElementById('fleet-form');
    fleetForm.reset();
    fleetForm['fleet-size'].disabled = true;
    let els = fleetForm.querySelectorAll('.planet_data-data');
    Array.prototype.map.call(els, (el) => {
        el.innerHTML = '';
    });
}

function showDestinyData(planet, occupier) {
    let destiny = document.querySelector('.destiny_planet');
    let destinyName = destiny.querySelector('.destiny_planet-name');
    let destinyShips = destiny.querySelector('.destiny_planet-ships');
    let destinyProduction = destiny.querySelector('.destiny_planet-production');

    destinyName.innerHTML = planet.name;

    destinyShips.innerHTML = '';
    destinyProduction.innerHTML = '';

    if (occupier) {
        destinyShips.innerHTML = planet.ships || 0;
        destinyProduction.innerHTML = planet.production;
    }
}

export function selectDestinyPlanet(state, planet) {
    state.destinyPlanet = planet;

    showDestinyData(planet, isOccupier(planet, state.players[0]));

    let fleetSizeInput = document.getElementById('fleet-size');
    fleetSizeInput.disabled = false;
    fleetSizeInput.max = state.sourcePlanet.ships;
    fleetSizeInput.focus();
}

function setSourcePlanet(state, planet) {
    state.sourcePlanet = planet;
    let source = document.querySelector('.source_planet');
    let sourceName = source.querySelector('.source_planet-name');
    let sourceShips = source.querySelector('.source_planet-ships');
    let sourceProduction = source.querySelector('.source_planet-production');

    sourceName.innerHTML = planet.name;
    sourceShips.innerHTML = planet.ships || 0;
    sourceProduction.innerHTML = planet.production;
}

export function selectSourcePlanet(state, planet) {
    if (state.sourcePlanet) {
        if (planet === state.sourcePlanet) {
            state.sourcePlanet = null;
            state.destinyPlanet = null;
            resetFleetForm();
        } else {
            selectDestinyPlanet(state, planet);
        }
    } else {
        setSourcePlanet(state, planet);
    }
}

function generateComputerFleet(state, planet) {
    let fleet = {};
    fleet.ships = Math.round(Math.random() * planet.ships);
    fleet.destiny = chooseDestiny(state, planet);
    fleet.player = planet.player;
    return fleet;
}

export function createComputerFleet(state, planet) {
    let fleet = generateComputerFleet(state, planet);
    updateShips(planet, planet.ships - fleet.ships);
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
    planet.space.classList.add(fleet.player.type);
    planet.player = fleetPlayer;

    oldPlayer.planets.pop(planet);
    fleetPlayer.planets.push(planet);

    updateShips(planet, fleet.ships);
}

function occupyPlanet(state, fleet) {
    console.log('empty planet', fleet, fleet.destiny);
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let fleetPlayerIndex = state.players.indexOf(fleet.player);

    state.planets[planetIndex].space.classList.add(fleet.player.name);
    state.planets[planetIndex].space.classList.add(fleet.player.type);
    state.planets[planetIndex].player = state.players[fleetPlayerIndex];
    state.players[fleetPlayerIndex].planets.push(state.planets[planetIndex]);

    updateShips(state.planets[planetIndex], fleet.ships);
}

function battle(state, fleet) {
    // console.log('BATTLE');
    // console.log('defense=', fleet.destiny.ships, 'atack=', fleet.ships);
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let planet = state.planets[planetIndex];

    if (planet.ships >= fleet.ships) { // defense win
        updateShips(planet, planet.ships - fleet.ships);
    } else { // attack win
        fleet.ships -= planet.ships;
        konquerPlanet(state, fleet);
    }
}

function reinforcements(planet, ships) {
    updateShips(planet, planet.ships + ships);
}

export function arrive(state, fleet) {
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let destinyPlanet = state.planets[planetIndex];

    if (!destinyPlanet.player) {
        occupyPlanet(state, fleet);
    } else if (isOccupier(destinyPlanet, fleet.player)) {
        reinforcements(destinyPlanet, fleet.ships);
    } else {
        battle(state, fleet);
    }
}
