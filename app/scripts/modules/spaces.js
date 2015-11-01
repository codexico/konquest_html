import { game } from '../main';

function createSpaces() {
  let spaceEl = document.createElement('span');
  spaceEl.className = 'space';

  for (var i = 0; i < game.totalSpaces; i++) {
    game.spaces.push(spaceEl.cloneNode());
  }
}

export function addSpaces() {
  createSpaces();
  game.spaces.forEach(function (space) {
    game.universe.appendChild(space);
  });
}

export function getEmptySpace() {
  let space = game.spaces[Math.floor(Math.random() * game.spaces.length)];
  if (!space.planet) {
    return space;
  }
  // try again
  return getEmptySpace();
}
