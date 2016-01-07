function createSpace() {
  let spaceEl = document.createElement('span');
  spaceEl.className = 'space';
  return spaceEl;
}

function createSpaces(total) {
  let spaceEl = createSpace();
  let spaces = [];

  for (var i = 0; i < total; i++) {
    spaces.push(spaceEl.cloneNode());
  }
  return spaces;
}

export function addSpaces(state, total) {
  state.spaces = createSpaces(total);
  state.spaces.map( (space) => {
    state.universe.appendChild(space);
  });
}

export function getEmptySpace(spaces) {
  let space = spaces[Math.floor(Math.random() * spaces.length)];
  if (!space.planet) {
    return space;
  }
  // try again
  return getEmptySpace(spaces);
}
