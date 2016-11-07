import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Galaxy from './Galaxy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Galaxy />, div);
});

it('has spaces', () => {
    const wrapper = mount((<Galaxy rows={3} cols={4} />));
    expect(wrapper.find('.galaxy_row').length).toEqual(3);
    expect(wrapper.find('.space').length).toEqual(12);
});

it('should have rows x cols spaces', () => {
  // expect (props rows) x (props cols) spaces
});

it('should have N planets', () => {
  // expect N planets (N < Spaces)
});
