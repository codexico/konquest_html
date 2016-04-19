import {calcRandomProduction} from './utils';
import {getEmptySpace} from './spaces';
import {state} from '../main';

// todo: better and others algorithms
export function wishToSendFleet(planet) {
    let planetBaseFleet = 10;
    let minGrow = 2;
    let planetMinFleet = planetBaseFleet + (state.turn * minGrow);
    return planet.ships > planetMinFleet;
}

export function isOcuppied(planet) {
    return planet.player;
}

export function grow(planet) {
    planet.ships += planet.production;
    return planet;
}

export function getEmptyPlanet() {
    let planetIndex = Math.floor(Math.random() * state.planets.length);
    let planet = state.planets[planetIndex];

    if (!planet.player) {
        return planet;
    }
    // try again
    return getEmptyPlanet();
}

function addPlanetName(planetEl) {
    planetEl.name = 'p' + state.planets.length;
    let nameEl = document.createElement('span');
    nameEl.className = 'planet-name';
    nameEl.innerHTML = planetEl.name;
    planetEl.appendChild(nameEl);
    return planetEl;
}

// todo: kill percent
function createPlanet(options) {
    let planet = document.createElement('span');

    planet.production = calcRandomProduction(options);
    planet.className = 'planet';
    planet = addPlanetName(planet);

    state.planets.push(planet);
    return planet;
}

function locatePlanet(allSpaces, planet) {
    let space = getEmptySpace(allSpaces);
    space.appendChild(planet);
    planet.space = space;
    space.planet = planet;
}

function isInvalidNumberOfPlanets(allSpaces, numberOfPlanets, numberOfPlayers) {
    let error = false;
    if (numberOfPlanets < numberOfPlayers) {
        console.error('numberOfPlanets < numberOfPlayers');
        error = true;
    }
    if (allSpaces.length < numberOfPlayers) {
        console.error('allSpaces.length < numberOfPlayers');
        error = true;
    }
    return error;
}

function getNumberOfPlanets(options, allSpaces) {
    let numberOfPlanets = Math.round(allSpaces.length * options.density);

    if (isInvalidNumberOfPlanets(allSpaces, numberOfPlanets, options.players)) {
        numberOfPlanets = allSpaces.length;
    }

    return numberOfPlanets;
}

export function addPlanets(options, allSpaces) {
    let planets = getNumberOfPlanets(options, allSpaces);

    for (let i = 0; i < planets; i++) {
        locatePlanet(allSpaces, createPlanet(options));
    }
}
