import {game, defaults} from '../main';

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
  planet.className = 'planet';
  planet = addPlanetName(planet);
  planet.production = 5 + Math.ceil(Math.random() * 10);
  // position needed to calculate attacks while dont use x,y
  planet.position = game.planets.length;
  game.planets.push(planet);
  return planet;
}

function getEmptySpace() {
  let space = game.spaces[Math.floor(Math.random() * game.spaces.length)];
  if (!space.planet) {
    return space;
  }
  // try again
  return getEmptySpace();
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
