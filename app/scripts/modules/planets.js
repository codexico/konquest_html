import { state, options } from '../main';
import { getEmptySpace } from './spaces';
import { calcRandomProduction } from './utils';

export function wishToSendFleet(planet) {
  // todo: better and others algorithms
  return planet.ships > (10 + (state.turn * 2));
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

function validate(allSpaces, numberOfPlanets) {
  let error = false;
  if (numberOfPlanets < options.players) {
    console.error('numberOfPlanets < options.players');
    error = true;
  }
  if (allSpaces.length < options.players) {
    console.error('allSpaces.length < options.players');
    error = true;
  }

  // try to fix
  if (numberOfPlanets > allSpaces.length) {
    console.error('numberOfPlanets > allSpaces.length');
    return allSpaces.length;
  }
  if (error && (allSpaces.length >= options.players) ) {
    return allSpaces.length;
  }

  return error ? false : numberOfPlanets;
}

export function addPlanets(allSpaces) {
  let numberOfPlanets = Math.round(allSpaces.length * options.density);
  let planets = validate(allSpaces, numberOfPlanets);

  for (var i = 0; i < planets; i++) {
    locatePlanet(allSpaces, createPlanet());
  }
}
