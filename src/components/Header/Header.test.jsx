
import React from 'react';
import { shallow } from 'enzyme';
import Header from '.';

describe('The Header component', () => {
  const wrapper = shallow(<Header />);

  it('should contain a header tag', () => {
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('should render header text properly', () => {
    expect(wrapper.find('h1').text()).toEqual('Maze Problem');
  })
})