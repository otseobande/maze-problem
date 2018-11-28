import React from 'react';
import { mount } from 'enzyme';
import Grid from '.';
import { gameBoard } from '../GameArea/fixtures';

describe('The Grid components', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      gameBoard
    }

    wrapper = mount(<Grid { ...props} />);
  });

  it('should render the right number of rows', () => {
    expect(wrapper.find('Row')).toHaveLength(2);
  });

  it('should render the right number of cells', () => {
    expect(wrapper.find('Cell')).toHaveLength(6);
  });
});
