///////////
// Space
///////////
function createSpace(x, y, i) {
    return {x, y, i};
}

function getEmptySpace(spaces) {
    const row = (Math.floor(Math.random() * spaces.length));
    const col = (Math.floor(Math.random() * spaces[0].length));

    if (!spaces[row][col].planet) {
        return {row, col};
    }
    // try again
    return getEmptySpace(spaces);
}

function createGalaxySpaces(rows, cols) {
  let galaxy = [];
  let rowSpaces = [];
  let index = 0;
  for (var y = 0; y < rows; y++) {
    rowSpaces = [];

    for (var x = 0; x < cols; x++) {
      rowSpaces.push(createSpace(x, y, index++));
    }

    galaxy.push(rowSpaces);
  }
  return galaxy;
}

///////////
// Player
///////////
function createLife(numPlayers) {
    const players = [];
    for (var i = 0; i < numPlayers; i++) {
        const player = {};
        player.name = `Player_${i}`;
        player.order = i;
        players.push(player);
    }
    return players;
}

///////////
// Planet
///////////
function getPlanetName(i) {
    let firstLetter = 'A';
    let charCode = firstLetter.charCodeAt(0);
    return String.fromCharCode(charCode + i);
}

function createPlanet(name, production) {
  return {ships: 0, production, name: name};
}

function createPlanets(numPlanets, production) {
  const planets = [];

  for (var i = 0; i < numPlanets; i++) {
    planets.push(createPlanet(getPlanetName(i), production));
  }

  return planets;
}

function getEmptyPlanet(planets) {
    const planetIndex = (Math.floor(Math.random() * planets.length));

    if (!planets[planetIndex].player) {
        return planets[planetIndex];
    }
    // try again
    return getEmptyPlanet(planets);
}

///////////
// Big Bang
///////////
function BigBang(options) {
  const numPlanets = Math.floor(options.rows * options.cols * options.density);

  const spaces = createGalaxySpaces(options.rows, options.cols);
  const planets = createPlanets(numPlanets, options.production);
  const players = createLife(options.players, planets);

  // place players on planets
  players.forEach((player) => {
      const planet = getEmptyPlanet(planets);
      planet.player = player;
      planet.ships = options.ships;
  });

  // place planets on spaces
  planets.forEach((planet) => {
      const {row, col} = getEmptySpace(spaces);
      spaces[row][col].planet = planet;
  });

  return {spaces, planets, players};
}

export default BigBang;

export const test = (process.env.NODE_ENV === 'test')
  ? { createLife, getEmptySpace, getEmptyPlanet }
  : null
