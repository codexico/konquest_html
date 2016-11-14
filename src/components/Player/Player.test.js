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
