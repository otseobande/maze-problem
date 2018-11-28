import React from 'react';
import { shallow } from 'enzyme';
import GameArea from '.';
import { gameBoard } from './fixtures';

describe('The GameArea component', () => {
  const wrapper = shallow(<GameArea gameBoard={gameBoard} moveCount={6} />);

  it('should display game instruction', () => {
    expect(wrapper.find('.instruction').text()).toEqual(
      'Goal: Collect all mushrooms with the least moves possible.'
    );
  });

  it('should render Grid component', () => {
    expect(wrapper.find('Grid')).toHaveLength(1);
  })
});
