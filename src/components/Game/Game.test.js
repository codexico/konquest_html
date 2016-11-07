import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Game from './Game';
import Galaxy from '../Galaxy/Galaxy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});

it('has galaxy', () => {
    const wrapper = mount((<Game />));
    expect(wrapper.find('.galaxy').length).toEqual(1);
});

it('has order', () => {
    const wrapper = shallow((<Game />));
    expect(wrapper.find('.order').length).toEqual(1);
});
