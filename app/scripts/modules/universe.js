import * as planets from './planets';
import * as spaces from './spaces';

function createUniverse() {
    let universeEl = document.createElement('div');
    universeEl.className = 'universe';
    return universeEl;
}

export function initUniverse(ui, options, state) {
    let universeEl = createUniverse();
    let allSpaces = spaces.addSpaces(universeEl, options.rows * options.cols);
    state.planets = planets.addPlanets(options, state, allSpaces);

    ui.map.appendChild(universeEl);
    return state;
}

export function bigBang(ui, options) {
    let singularity = document.querySelectorAll('.singularity');
    let spaceWidth = singularity[0].offsetWidth;
    singularity[0].remove();
    ui.map.style.width = (spaceWidth * options.cols) + 'px';
}
