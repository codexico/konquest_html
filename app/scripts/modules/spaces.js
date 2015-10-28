import {game} from '../main';

function createSpaces() {
  game.spaces = [];
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
