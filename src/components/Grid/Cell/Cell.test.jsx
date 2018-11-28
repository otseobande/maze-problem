import React from 'react';
import { shallow } from 'enzyme';
import Cell from '.';

describe('The Cell component', () => {
  const wrapper = shallow(<Cell value="mario" />);
  it('should display mario if value prop is mario', () => {
    expect(wrapper.find('img[alt="mario"]')).toHaveLength(1);
  });

  it('should not display mushroom if value prop is mario', () => {
    expect(wrapper.find('img[alt="mushroom"]')).toHaveLength(0);
  });

  it('should display mushroom if value prop is mushroom', () => {
    wrapper.setProps({ value: 'mushroom' })
    expect(wrapper.find('img[alt="mushroom"]')).toHaveLength(1);
  });

  it('should not display mushroom if value prop is mario', () => {
    wrapper.setProps({ value: 'mushroom' })
    expect(wrapper.find('img[alt="mario"]')).toHaveLength(0);
  });
});