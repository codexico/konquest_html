import {chooseDestiny} from './utils';

export function createHumanFleet(e, state) {
    e.preventDefault();

    let fleet = {};
    fleet.ships = parseInt(e.target['fleet-size'].value, 10);
    fleet.destiny = state.destinyPlanet;
    fleet.player = state.sourcePlanet.player;
    state.sourcePlanet.ships -= fleet.ships;
    state.fleets.push(fleet);
}

export function selectDestinyPlanet(state, planet) {
    state.destinyPlanet = planet;

    let destinyHTHML = document.querySelector('.destiny_planet');
    destinyHTHML.innerHTML = planet.name;

    let fleetSizeInput = document.getElementById('fleet-size');
    fleetSizeInput.disabled = false;
    fleetSizeInput.max = state.sourcePlanet.ships;
    fleetSizeInput.focus();
}

function setSourcePlanet(state, planet) {
    state.sourcePlanet = planet;
    let sourceHTHML = document.querySelector('.source_planet');
    sourceHTHML.innerHTML = planet.name;
}

export function selectSourcePlanet(state, planet) {
    if (state.sourcePlanet) {
        if (planet === state.sourcePlanet) {
            console.log('same planet');
        } else {
            console.log('source changed', planet);
            setSourcePlanet(state, planet);
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
    planet.space.classList.add(fleet.player.type);
    planet.player = fleetPlayer;

    if (fleet.player.type === 'human') {
        planet.space.addEventListener('click', function onClickPlanet(e) {
            let clickedPlanet = e.target.planet || e.target.offsetParent.planet;
            console.log('clickedPlanet', clickedPlanet);
            selectSourcePlanet(state, clickedPlanet);
        });
    }

    oldPlayer.planets.pop(planet);
    fleetPlayer.planets.push(planet);

    planet.ships = fleet.ships;
}

function occupyPlanet(state, fleet) {
    console.log('empty planet', fleet, fleet.destiny);
    let planetIndex = state.planets.indexOf(fleet.destiny);
    let fleetPlayerIndex = state.players.indexOf(fleet.player);

    state.planets[planetIndex].space.classList.add(fleet.player.name);
    state.planets[planetIndex].space.classList.add(fleet.player.type);
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
