import {game, defaults, ui} from '../main';
import * as planets from './planets';
import * as spaces from './spaces';

export function createUniverse() {
  let universeEl = document.createElement('div');
  universeEl.className = 'universe';
  game.universe = universeEl;
}

export function initUniverse() {
  createUniverse();
  spaces.addSpaces();
  planets.addPlanets();
  ui.map.appendChild(game.universe);
}

export function bigBang() {
  let singularity = document.querySelectorAll('.singularity');
  let spaceWidth = singularity[0].offsetWidth;
  singularity[0].remove();
  ui.map.style.width = (spaceWidth * defaults.cols) + 'px';
}
