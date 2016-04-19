import {calcRandomProduction} from './utils';
import {getEmptySpace} from './spaces';

// todo: better and others algorithms
export function wishToSendFleet(state, planet) {
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

export function getEmptyPlanet(state) {
    let planetIndex = Math.floor(Math.random() * state.planets.length);
    let planet = state.planets[planetIndex];

    if (!planet.player) {
        return planet;
    }
    // try again
    return getEmptyPlanet(state);
}

function addPlanetName(planetName, planetEl) {
    planetEl.name = planetName;
    let nameEl = document.createElement('span');
    nameEl.className = 'planet-name';
    nameEl.innerHTML = planetEl.name;
    planetEl.appendChild(nameEl);
    return planetEl;
}

// todo: kill percent
function createPlanet(options, planetName) {
    let planetEl = document.createElement('span');

    planetEl.production = calcRandomProduction(options);
    planetEl.className = 'planet';
    planetEl = addPlanetName(planetName, planetEl);

    return planetEl;
}

function locatePlanet(allSpaces, planet) {
    let space = getEmptySpace(allSpaces);
    space.appendChild(planet);
    space.planet = planet;
    return space;
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

export function addPlanets(options, state, allSpaces) {
    let numberOfPlanets = getNumberOfPlanets(options, allSpaces);
    let planets = [];

    for (let i = 0; i < numberOfPlanets; i++) {
        let planetName = 'p' + i;
        let planet = createPlanet(options, planetName);

        planet.space = locatePlanet(allSpaces, planet);

        planets.push(planet);
    }

    return planets;
}
