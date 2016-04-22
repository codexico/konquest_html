function nextPlanet(state, planet) {
    // todo: use x,y to calculate near planets
    let p = state.planets.indexOf(planet) + 1;
    if (p === state.planets.length) {
        p = 0;
    }
    return state.planets[p];
}

export function chooseDestiny(state, planet) {
    // todo: more and better algorithms
    return nextPlanet(state, planet);
}

export function calcRandomProduction(options) {
    let minProduction = Math.floor(options.production / 2);
    let randomProduction = Math.floor(Math.random() * options.production);

    return minProduction + randomProduction;
}

function end(state) {
    state.players.forEach(function (player) {
        if (player.planets.length) {
            console.info(player.name, 'is the winner!');
        }
    });
}

export function logScore(state) {
    console.group();
    let dead = 0;

    state.players.forEach(function (player) {
        let ships = 0;
        let production = 0;
        player.planets.forEach(function (planet) {
            ships += parseInt(planet.ships, 10);
            production += planet.production;
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
        end(state);
    }
    console.groupEnd();
}

export function isOccupier(planet, player) {
    return planet.player === player;
}
