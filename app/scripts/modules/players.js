import {getEmptyPlanet} from './planets';

function createLife(options, planet, player) {
    planet.space.classList.add(player.name);
    planet.ships = options.ships;
    planet.production = options.production; // override random production
    planet.player = player;
    player.planets = [];
    player.planets.push(planet);
}

function createPlayer(state) {
    let player = document.createElement('span');
    player.name = 'player_' + state.players.length;
    player.className = 'player ' + player.name;
    state.players.push(player);
    return state.players[state.players.length - 1];
}

function addPlayer(options, state) {
    createLife(options, getEmptyPlanet(state), createPlayer(state));
}

export function addPlayers(options, state) {
    for (let i = 0; i < options.players; i++) {
        addPlayer(options, state);
    }
}
