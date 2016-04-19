import {state} from '../main';

function nextPlanet(planet) {
    // todo: use x,y to calculate near planets
    let p = state.planets.indexOf(planet) + 1;
    if (p === state.planets.length) {
        p = 0;
    }
    return state.planets[p];
}

export function chooseDestiny(planet) {
    // todo: more and better algorithms
    return nextPlanet(planet);
}

export function calcRandomProduction(options) {
    let minProduction = options.production / 2;
    let randomProduction = Math.floor(Math.random() * options.production);

    return minProduction + randomProduction;
}

function end() {
    state.players.forEach(function (player) {
        if (player.planets.length) {
            console.info(player.name, 'is the winner!');
        }
    });
}

export function score() {
    console.group();
    let dead = 0;
    let countTotalPlanets = 0;
    state.players.forEach(function (player) {
        let ships = 0;
        let production = 0;
        player.planets.forEach(function (planet) {
            ships += planet.ships;
            production += planet.production;
            countTotalPlanets += 1;
        });

        if (player.planets.length === 0) {
            console.log(player.name, 'is dead :(');
            dead += 1;
        } else {
            console.log(player.name,
                'planets =', player.planets.length,
                'ships =', ships,
                'production =', production
            );
        }
    });

    if (state.players.length - dead === 1) {
        end();
    }
    console.groupEnd();
}
