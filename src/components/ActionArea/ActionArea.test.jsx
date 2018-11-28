import React from 'react';
import { shallow } from 'enzyme';
import ActionArea from '.';

describe('The ActionArea Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ActionArea />);
  });

  it('should render DimensionDialog if gameStarted is false', () => {
    wrapper.setState({ gameStarted: false});

    expect(wrapper.find('DimensionDialog')).toHaveLength(1);
    expect(wrapper.find('GameArea')).toHaveLength(0);
  });

  it('should render GameArea if gameStarted is true', () => {
    wrapper.setState({ gameStarted: true });

    expect(wrapper.find('GameArea')).toHaveLength(1);
    expect(wrapper.find('DimensionDialog')).toHaveLength(0);
  });

  describe('The startGame method', () => {
    it('should set gameStarted state to true when called', () => {
      wrapper.setState({ gameStarted: false });

      wrapper.instance().startGame();

      expect(wrapper.state().gameStarted).toBeTruthy();
    });

    it('should call updateGameBoard method when called', () => {
      const instance = wrapper.instance();
      const updateGameBoard = jest.spyOn(instance, 'updateGameBoard');

      instance.startGame();

      expect(updateGameBoard).toBeCalled();
    });
  });

  describe('The updateGameBoard method', () => {
    beforeEach(() => {
      wrapper.setState({ height: 10, width: 20 });

      wrapper.instance().updateGameBoard();
    });

    it('should update gameBoard state based on given height and width', () => {
      expect(wrapper.state().gameBoard).toHaveLength(10);
      wrapper.state().gameBoard.forEach((row) => {
        expect(row).toHaveLength(20);
      });
    });

    it('should place mario in the game board', () => {
      const marioExists = wrapper.state().gameBoard.some(row => {
        return row.some(value => value === 'mario');
      });

      expect(marioExists).toBeTruthy();
    });

    it('should place mushroom in the game board', () => {
      const mushroomExists = wrapper.state().gameBoard.some(row => {
        return row.some(value => value === 'mushroom');
      });

      expect(mushroomExists).toBeTruthy();
    });
  });

  describe('The handleDimensionChange method', () => {
    it('should update state with the value from event target', () => {
      const event = {
        target: { value: 4, name: 'height' }
      };

      wrapper.instance().handleDimensionChange(event);

      expect(wrapper.state().height).toEqual(4);
    });

    it('should set state to 0 if element value is falsy', () => {
      const event = {
        target: { value: '', name: 'width' }
      };

      wrapper.instance().handleDimensionChange(event);

      expect(wrapper.state().width).toEqual(0);
    });
  });
});
