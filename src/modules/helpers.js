function nextArrayItem(array, item) {
    const index = array.indexOf(item) + 1;
    if (index === array.length) {
        return array[0];
    }
    return array[index];
}

function random() {
    return Math.random();
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export { nextArrayItem, random, clone };
