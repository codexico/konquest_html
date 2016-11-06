import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Space from './Space';
import Planet from '../Planet/Planet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Space />, div);
});

it('has space', () => {
    const wrapper = shallow((<Space />));
    expect(wrapper.find('.space').length).toEqual(1);
});

it('is button', () => {
    const wrapper = shallow((<Space />));
    expect(wrapper.find('button').length).toEqual(1);
});

it('renders Planet', () => {
    const wrapper = mount((<Space hasPlanet={true} />));
    expect(wrapper.contains(<Planet />)).toEqual(true);
});

it('is empty', () => {
    const wrapper = mount((<Space hasPlanet={false} />));
    expect(wrapper.contains(<Planet />)).toEqual(false);
});
