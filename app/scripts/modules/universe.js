import { state, options, ui } from '../main';
import * as planets from './planets';
import * as spaces from './spaces';

function createUniverse() {
  let universeEl = document.createElement('div');
  universeEl.className = 'universe';
  state.universe = universeEl;
}

export function initUniverse() {
  createUniverse();
  spaces.addSpaces(state, options.rows * options.cols);
  planets.addPlanets();
  ui.map.appendChild(state.universe);
}

export function bigBang() {
  let singularity = document.querySelectorAll('.singularity');
  let spaceWidth = singularity[0].offsetWidth;
  singularity[0].remove(); // PhantomJS compatibility
  // singularity[0].parentNode.removeChild(singularity[0]);
  ui.map.style.width = (spaceWidth * options.cols) + 'px';
}
