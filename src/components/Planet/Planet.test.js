import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Planet from './Planet';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Planet />, div);
});

it('has Planet', () => {
    const wrapper = shallow((<Planet />));
    expect(wrapper.find('.Planet').length).toEqual(1);
});
