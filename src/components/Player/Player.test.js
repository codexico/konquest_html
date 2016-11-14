import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Player, { createLife } from './Player';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const player = {order:1};
  ReactDOM.render(<Player player={player} />, div);
});

it('has Player', () => {
    const player = {order:1};
    const wrapper = shallow((<Player player={player} />));
    expect(wrapper.find('.Player').length).toEqual(1);
});

it('create Life', () => {
    const players = createLife(1, [{name:'planet0'}]);
    expect(players.length).toEqual(1);
    expect(players[0].name).toEqual('Player_0');
    // expect(players[0].planet.name).toEqual('planet0');
});

it('create Players', () => {
    const players = createLife(2, [
        {name:'planet0'},
        {name:'planet1'}
    ]);
    expect(players.length).toEqual(2);
    expect(players[1].name).toEqual('Player_1');
    // expect(players[1].planet.name).toEqual('planet1');
});
