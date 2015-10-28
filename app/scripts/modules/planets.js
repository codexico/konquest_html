import {game, defaults} from '../main';

function addPlanetName(planetEl) {
  planetEl.name = 'p' + game.planets.length;
  let nameEl = document.createElement('span');
  nameEl.className = 'planet-name';
  nameEl.innerHTML = planetEl.name;
  planetEl.appendChild(nameEl);
  return planetEl;
}

function createPlanet() {
  let planet = document.createElement('span');
  planet.className = 'planet';
  planet = addPlanetName(planet);
  planet.production = 5 + Math.ceil(Math.random() * 10);
  // todo: kill percent
  game.planets.push(planet);
  planet.position = game.planets.length - 1;
  return planet;
}

function randomAddPlanet(space) {
  if (Math.random() < defaults.density) {
    let planet = createPlanet();
    space.appendChild(planet);
    planet.space = space;
    space.planet = planet;
  }
}

export function addPlanets() {
  game.planets = [];
  game.spaces.forEach(randomAddPlanet);
}
