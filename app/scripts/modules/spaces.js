function createSpace() {
    let spaceEl = document.createElement('span');
    spaceEl.className = 'space';
    return spaceEl;
}

function createSpaces(total) {
    let spaceEl = createSpace();
    let allSpaces = [];

    for (let i = 0; i < total; i++) {
        allSpaces.push(spaceEl.cloneNode());
    }
    return allSpaces;
}

export function addSpaces(universeEl, size) {
    let allSpaces = createSpaces(size);
    allSpaces.map((space) => {
        universeEl.appendChild(space);
    });
    return allSpaces;
}

export function getEmptySpace(allSpaces) {
    let space = allSpaces[Math.floor(Math.random() * allSpaces.length)];
    if (!space.planet) {
        return space;
    }
    // try again
    return getEmptySpace(allSpaces);
}
