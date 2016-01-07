import * as planets from './planets';
import * as spaces from './spaces';

function createUniverse() {
  let universeEl = document.createElement('div');
  universeEl.className = 'universe';
  return universeEl;
}

export function initUniverse(ui, options) {
  let universeEl = createUniverse();
  let allSpaces = spaces.addSpaces(universeEl, options.rows * options.cols);
  planets.addPlanets(allSpaces);

  ui.map.appendChild(universeEl);
}

export function bigBang(ui, options) {
  let singularity = document.querySelectorAll('.singularity');
  let spaceWidth = singularity[0].offsetWidth;
  singularity[0].remove();
  ui.map.style.width = (spaceWidth * options.cols) + 'px';
}
