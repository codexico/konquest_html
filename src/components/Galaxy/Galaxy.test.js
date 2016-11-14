import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import BigBang from '../BigBang/BigBang';
import Galaxy from '../Galaxy/Galaxy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Galaxy spaces={[]} />, div);
});

it('has spaces', () => {
    const {spaces, planets, players} = BigBang({
        rows: 3,
        cols: 4
    });
    const wrapper = mount((<Galaxy spaces={spaces} />));
    expect(wrapper.find('.galaxy_row').length).toEqual(3);
    expect(wrapper.find('.space').length).toEqual(12);
});
