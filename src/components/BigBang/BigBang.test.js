import { shallow, mount, render } from 'enzyme';
import BigBang, { test } from '../BigBang/BigBang';

const defaults = {
  rows: 14,
  cols: 10,
  density: 0.2,
  players: 5,
  ships: 10,
  production: 10
};
const universe = BigBang(defaults);

it('create Life', () => {
    const players = test.createLife(1, [{name:'planet0'}]);
    expect(players.length).toEqual(1);
    expect(players[0].name).toEqual('Player_0');
    // expect(players[0].planet.name).toEqual('planet0');
});

it('create Players', () => {
    const players = test.createLife(2, [
        {name:'planet0'},
        {name:'planet1'}
    ]);
    expect(players.length).toEqual(2);
    expect(players[1].name).toEqual('Player_1');
    // expect(players[1].planet.name).toEqual('planet1');
});

it('create universe', () => {
    const {spaces, planets, players} = BigBang(defaults);
    expect(spaces.length).toEqual(defaults.rows);
    expect(spaces[0].length).toEqual(defaults.cols);
    expect(planets.length).toEqual(
        Math.floor(defaults.rows * defaults.cols * defaults.density)
    );
    expect(players.length).toEqual(defaults.players);
});

it('get empty space', () => {
    const {row, col} = test.getEmptySpace(universe.spaces);

    expect(row).toBeGreaterThanOrEqual(0);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(universe.spaces[row][col].i).toBeGreaterThanOrEqual(0);
    expect(universe.spaces[row][col].planet).toBeUndefined();
});

it('get empty planet', () => {
    const planet = test.getEmptyPlanet(universe.planets);
    console.log(planet);
    expect(planet.ships).toEqual(0);
    expect(planet.production).toBeGreaterThanOrEqual(1);
    expect(planet.name).toBeDefined();
    expect(planet.player).toBeUndefined();
});
