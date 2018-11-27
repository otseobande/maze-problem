import React from 'react';
import { shallow } from 'enzyme';
import DimensionDialog from '.';

describe('The DimensionDialog component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      width: 10,
      height: 10,
      handleInputChange: jest.fn(),
      startGame: jest.fn(),
    };

    wrapper = shallow(<DimensionDialog { ...props } />);
  });

  it('should contain right number of inputs', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should call handleInputChange prop on height change', () => {
    wrapper.find('input[name="height"]').simulate('change');

    expect(props.handleInputChange).toBeCalled();
  });

  it('should call handleInputChange prop on width change', () => {
    wrapper.find('input[name="width"]').simulate('change');

    expect(props.handleInputChange).toBeCalled();
  });

  it('should call startGame prop when form is submitted', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(props.startGame).toBeCalled();
  })
});