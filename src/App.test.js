import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Game from './components/Game/Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders title', () => {
  const wrapper = shallow(<App />);
  const title = <h1>Konquest</h1>;
  expect(wrapper.contains(title)).toEqual(true);
});

it('renders game', () => {
    const wrapper = mount((<App />));
    expect(wrapper.contains(<Game />)).toEqual(true);
});
