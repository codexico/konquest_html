import {getEmptyPlanet} from './planets';

function createLife(options, planet, player) {
    planet.space.classList.add(player.name);
    planet.space.classList.add(player.type);
    planet.ships = options.ships;
    planet.production = options.production; // override random production
    planet.player = player;
    player.planets = [];
    player.planets.push(planet);
}

function createPlayer(state, type) {
    let player = document.createElement('span');
    player.name = 'player_' + state.players.length;
    player.className = 'player ' + player.name;
    player.type = type;
    state.players.push(player);
    return state.players[state.players.length - 1];
}

function addPlayer(options, state, type = 'computer') {
    createLife(options, getEmptyPlanet(state), createPlayer(state, type));
}

export function addPlayers(options, state) {
    addPlayer(options, state, 'human');
    for (let i = 0; i < options.players; i++) {
        addPlayer(options, state);
    }
}
