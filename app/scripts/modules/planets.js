import {calcRandomProduction, getRandomLetter, isOccupier} from './utils';
import {selectDestinyPlanet, selectSourcePlanet} from './fleets';
import {getEmptySpace} from './spaces';

// todo: better and others algorithms
export function wishToSendFleet(state, planet) {
    let planetBaseFleet = 10;
    let minGrow = 2;
    let planetMinFleet = planetBaseFleet + (state.turns.length * minGrow);
    return planet.ships > planetMinFleet;
}

export function isOccupied(planet) {
    return planet.player;
}

export function isComputer(player) {
    return player.type === 'computer';
}

export function isOccupiedByComputer(planet) {
    return isOccupied(planet) && isComputer(planet.player);
}

export function growPlanet(planet) {
    planet.ships += parseInt(planet.production, 10);
    planet.shipsEl.innerHTML = planet.ships;
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

function addPlanetBody(planetEl) {
    let bodyEl = document.createElement('span');
    bodyEl.className = 'planet-body';
    planetEl.bodyEl = bodyEl;
    planetEl.bodyEl.innerHTML = getRandomLetter();
    planetEl.appendChild(bodyEl);
}

// todo: kill percent
function createPlanet(options, planetName) {
    let planetEl = document.createElement('span');

    addPlanetBody(planetEl);
    planetEl.production = calcRandomProduction(options);

    planetEl.className = 'planet';
    addPlanetName(planetName, planetEl);

    let shipsEl = document.createElement('span');
    shipsEl.className = 'planet-ships';
    planetEl.shipsEl = shipsEl;
    planetEl.appendChild(shipsEl);


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

    function onClickPlanet(e) {
        let clickedPlanet = e.target.planet || e.target.offsetParent.planet;
        if (isOccupier(clickedPlanet, state.players[0])) {
            selectSourcePlanet(state, clickedPlanet);
        } else if (state.sourcePlanet) {
            selectDestinyPlanet(state, clickedPlanet);
        }
    }

    for (let i = 0; i < numberOfPlanets; i++) {
        let planetName = 'p' + i;
        let planet = createPlanet(options, planetName);

        planet.space = locatePlanet(allSpaces, planet);
        planet.space.addEventListener('click', onClickPlanet);
        planets.push(planet);
    }

    return planets;
}
