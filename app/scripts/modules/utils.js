import {game, defaults, ui} from './game';

export function score() {
  game.players.forEach(function (player) {
    let ships = 0;
    let production = 0;
    player.planets.forEach(function (planet) {
      ships += planet.ships;
      production += planet.production;
    });
    console.log(player.name,
      'planets =', player.planets.length,
      'ships =', ships,
      'production =', production
    );
  });
}
