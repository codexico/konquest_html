import { game, defaults } from '../main';

function nextPlanet(planet) {
  // todo: use x,y to calculate near planets
  let nextPlanet = game.planets.indexOf(planet) + 1;
  if (nextPlanet === game.planets.length) {
    nextPlanet = 0;
  }
  return game.planets[nextPlanet];
}

export function chooseDestiny(planet) {
  // todo: more and better algorithms
  return nextPlanet(planet);
}

export function calcRandomProduction() {
  let minProduction = defaults.production / 2;
  let randomProduction = Math.floor(Math.random() * defaults.production);

  return minProduction + randomProduction;
}

function end() {
  game.players.forEach(function (player) {
    if (player.planets.length) {
      console.info(player.name, 'is the winner!');
    }
  });
}

export function score() {
  console.group();
  let dead = 0;
  let countTotalPlanets = 0;
  game.players.forEach(function (player) {
    let ships = 0;
    let production = 0;
    player.planets.forEach(function (planet) {
      ships += planet.ships;
      production += planet.production;
      countTotalPlanets++;
    });

    if (!player.planets.length) {
      console.log(player.name, 'is dead :(');
      dead++;
    } else {
      console.log(player.name,
        'planets =', player.planets.length,
        'ships =', ships,
        'production =', production
      );
    }
  });

  if (game.players.length - dead === 1) {
    end();
  }
  console.groupEnd();
}
