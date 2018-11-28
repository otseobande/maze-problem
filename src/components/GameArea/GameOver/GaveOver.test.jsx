import React from 'react';
import { shallow } from 'enzyme';
import GameOver from '.';

describe('The GameOver component', () => {
  const props = {
    moveCount: 3,
    resetBoard: jest.fn(),
    resetGame: jest.fn(),
  }
  const wrapper = shallow(<GameOver { ...props } />);

  it('should display the number of moves it took to complete the game', () => {
    expect(wrapper.find('.game-over > h4').text()).toEqual(`Game completed in ${props.moveCount} moves!`);
  });

  it('should call resetBoard prop when restart game button is clicked', () => {
    wrapper.find('button[id="restart"]').simulate('click');

    expect(props.resetBoard).toBeCalled();
  });

  it('should call resetGame prop when change board button is clicked', () => {
    wrapper.find('button[id="change-board"]').simulate('click');

    expect(props.resetGame).toBeCalled();
  });
});