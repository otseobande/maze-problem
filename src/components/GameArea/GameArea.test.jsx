import React from 'react';
import { shallow } from 'enzyme';
import GameArea from '.';

describe('The GameArea Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameArea />);
  });

  it('should render DimensionDialog', () => {
    expect(wrapper.find('DimensionDialog')).toHaveLength(1);
  });

  describe('The handleDimensionChange method', () => {
    it('should update state with the value from event target', () => {
      const event = {
        target: { value: 4, name: 'height' }
      };

      wrapper.instance().handleDimensionChange(event);

      expect(wrapper.state().height).toEqual(4);
    });
  });
});