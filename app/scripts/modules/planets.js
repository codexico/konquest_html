import { game, defaults } from '../main';
import { getEmptySpace } from './spaces';
import { calcRandomProduction } from './utils';

export function getEmptyPlanet() {
  let planetIndex = Math.floor(Math.random() * game.planets.length);
  let planet = game.planets[planetIndex];

  if (!planet.player) {
    return planet;
  }
  // try again
  return getEmptyPlanet();
}

function addPlanetName(planetEl) {
  planetEl.name = 'p' + game.planets.length;
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

  game.planets.push(planet);
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
  if (game.spaces.length < defaults.players) {
    console.error('game.spaces.length < defaults.players');
    error = true;
  }

  // try to fix
  if (numberOfPlanets > game.spaces.length) {
    console.error('numberOfPlanets > game.spaces.length');
    return game.spaces.length;
  }
  if (error && (game.spaces.length >= defaults.players) ) {
    return game.spaces.length;
  }

  return error ? false : numberOfPlanets;
}

export function addPlanets() {
  let planets = validate(Math.round(game.spaces.length * defaults.density));

  for (var i = 0; i < planets; i++) {
    locatePlanet(createPlanet());
  }
}
