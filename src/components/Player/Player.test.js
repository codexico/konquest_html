import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Player, { test } from './Player';



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

it('do not send fleet', () => {
    const random = () => 1;
    expect(test.wishToSendFleet(10, 0, random)).toEqual(false);
    expect(test.wishToSendFleet(20, 5, random)).toEqual(false);
});

it('send fleet', () => {
    const random = () => 1;
    expect(test.wishToSendFleet(11, 1, random)).toEqual(false);
    expect(test.wishToSendFleet(13, 1, random)).toEqual(true);
    expect(test.wishToSendFleet(55, 5, random)).toEqual(true);
});

it('do not send fleet even with enough ships', () => {
    const random = () => 0.3;
    expect(test.wishToSendFleet(13, 1, random)).toEqual(false);
    expect(test.wishToSendFleet(55, 5, random)).toEqual(false);
});


it('should return the next item', () => {
    const planets = ['a', 'b'];
    expect(test.chooseDestiny(planets, 'a')).toBe('b');
});

it('create fleet', () => {
    const planet = {
        ships: 10,
        player: 'Player_1'
    };
    const {fleet} = test.createComputerFleet(planet, 'a');
    expect(fleet.destiny).toBe('a');
    expect(fleet.ships).toBeLessThan(planet.ships);
    expect(fleet.player).toEqual(planet.player);
    // expect(planet).toEqual(planet.player);
});
