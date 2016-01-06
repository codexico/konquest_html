import { state } from '../main';

function createSpaces() {
  let spaceEl = document.createElement('span');
  spaceEl.className = 'space';

  for (var i = 0; i < state.totalSpaces; i++) {
    state.spaces.push(spaceEl.cloneNode());
  }
}

export function addSpaces() {
  createSpaces();
  state.spaces.forEach(function (space) {
    state.universe.appendChild(space);
  });
}

export function getEmptySpace() {
  let space = state.spaces[Math.floor(Math.random() * state.spaces.length)];
  if (!space.planet) {
    return space;
  }
  // try again
  return getEmptySpace();
}
