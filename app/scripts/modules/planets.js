import {options, state} from '../main';
import {calcRandomProduction} from './utils';
import {getEmptySpace} from './spaces';

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
function createPlanet() {
    let planet = document.createElement('span');

    planet.production = calcRandomProduction();
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

function isInvalidNumberOfPlanets(allSpaces, numberOfPlanets) {
    let error = false;
    if (numberOfPlanets < options.players) {
        console.error('numberOfPlanets < options.players');
        error = true;
    }
    if (allSpaces.length < options.players) {
        console.error('allSpaces.length < options.players');
        error = true;
    }
    return error;
}

function getNumberOfPlanets(allSpaces) {
    let numberOfPlanets = Math.round(allSpaces.length * options.density);

    if (isInvalidNumberOfPlanets(allSpaces)) {
        numberOfPlanets = allSpaces.length;
    }

    return numberOfPlanets;
}

export function addPlanets(allSpaces) {
    let planets = getNumberOfPlanets(allSpaces);

    for (let i = 0; i < planets; i++) {
        locatePlanet(allSpaces, createPlanet());
    }
}
