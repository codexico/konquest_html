import { state, defaults } from '../main';
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

function locatePlanet(planet) {
  let space = getEmptySpace();
  space.appendChild(planet);
  planet.space = space;
  space.planet = planet;
}

function validate(numberOfPlanets) {
  let error = false;
  if (numberOfPlanets < defaults.players) {
    console.error('numberOfPlanets < defaults.players');
    error = true;
  }
  if (state.spaces.length < defaults.players) {
    console.error('state.spaces.length < defaults.players');
    error = true;
  }

  // try to fix
  if (numberOfPlanets > state.spaces.length) {
    console.error('numberOfPlanets > state.spaces.length');
    return state.spaces.length;
  }
  if (error && (state.spaces.length >= defaults.players) ) {
    return state.spaces.length;
  }

  return error ? false : numberOfPlanets;
}

export function addPlanets() {
  let planets = validate(Math.round(state.spaces.length * defaults.density));

  for (var i = 0; i < planets; i++) {
    locatePlanet(createPlanet());
  }
}
