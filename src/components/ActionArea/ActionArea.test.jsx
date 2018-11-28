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

  describe('Mario move methods', () => {
    let gameBoard;

    beforeEach(() => {
      gameBoard = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
      ];
    });

    describe('The moveMarioVertically method', () => {
      it('should move mario up if called with up', () => {
        gameBoard[2][1] = 'mario';

        wrapper.setState({ gameBoard });

        wrapper.instance().moveMarioVertically('up');

        expect(wrapper.state().gameBoard[2][1]).toEqual('empty');
        expect(wrapper.state().gameBoard[1][1]).toEqual('mario');
      });

      it('should move mario down if called with down', () => {
        gameBoard[0][1] = 'mario';

        wrapper.setState({ gameBoard });

        wrapper.instance().moveMarioVertically('down');

        expect(wrapper.state().gameBoard[0][1]).toEqual('empty');
        expect(wrapper.state().gameBoard[1][1]).toEqual('mario');
      });
    });

    describe('The moveMarioHorizontally method', () => {
      describe('When called with "left"', () => {
        beforeEach(() => {
          gameBoard[2][1] = 'mario';

          wrapper.setState({ gameBoard });
          wrapper.instance().moveMarioHorizontally('left');
        });

        it('should move mario left', () => {
          expect(wrapper.state().gameBoard[2][1]).toEqual('empty');
          expect(wrapper.state().gameBoard[2][0]).toEqual('mario');
        });

        it('should update moveCount', () => {
          expect(wrapper.state().moveCount).toEqual(1);
        });
      })

      describe('When called with "right"', () => {
        beforeEach(() => {
          gameBoard[2][1] = 'mario';

          wrapper.setState({ gameBoard });
          wrapper.instance().moveMarioHorizontally('right');
        });

        it('should move mario right', () => {
          expect(wrapper.state().gameBoard[2][1]).toEqual('empty');
          expect(wrapper.state().gameBoard[2][2]).toEqual('mario');
        });

        it('should update moveCount', () => {
          expect(wrapper.state().moveCount).toEqual(1);
        });
      })
    });
  });

  describe('The handleKeyDown method', () => {
    beforeEach(() => {
      wrapper.setState({
        gameStarted: true,
        gameBoard: [
          ['empty', 'empty', 'empty'],
          ['empty', 'mario', 'empty'],
          ['empty', 'empty', 'empty'],
        ]
      });
    });

    it('should call moveMarioVertically with "up" on "ArrowUp" event', () => {
      const instance = wrapper.instance();
      const ArrowUpEvent = {
        key: 'ArrowUp'
      };

      const moveMarioVertically = jest.spyOn(instance, 'moveMarioVertically')

      instance.handleKeyDown(ArrowUpEvent);

      expect(moveMarioVertically).toBeCalledWith('up');
    })

    it('should call moveMarioVertically with "down" on "ArrowDown" event', () => {
      const instance = wrapper.instance();
      const ArrowDownEvent = {
        key: 'ArrowDown'
      };

      const moveMarioVertically = jest.spyOn(instance, 'moveMarioVertically')

      instance.handleKeyDown(ArrowDownEvent);

      expect(moveMarioVertically).toBeCalledWith('down');
    })

    it('should call moveMarioHorizontally with "left" on "ArrowLeft" event', () => {
      const instance = wrapper.instance();
      const ArrowLeftEvent = {
        key: 'ArrowLeft'
      };

      const moveMarioHorizontally = jest.spyOn(instance, 'moveMarioHorizontally');

      instance.handleKeyDown(ArrowLeftEvent);

      expect(moveMarioHorizontally).toBeCalledWith('left');
    });

    it('should call moveMarioHorizontally with "right" on "ArrowRight" event', () => {
      const instance = wrapper.instance();
      const ArrowRightEvent = {
        key: 'ArrowRight'
      };

      const moveMarioHorizontally = jest.spyOn(instance, 'moveMarioHorizontally');

      instance.handleKeyDown(ArrowRightEvent);

      expect(moveMarioHorizontally).toBeCalledWith('right');
    });

    it('should not call move method of other keys other than arrows', () => {
      const instance = wrapper.instance();
      const event = {
        key: 'Q'
      }

      const moveMarioHorizontally = jest.spyOn(instance, 'moveMarioHorizontally');
      const moveMarioVertically = jest.spyOn(instance, 'moveMarioVertically')

      instance.handleKeyDown(event);

      expect(moveMarioHorizontally).not.toBeCalled();
      expect(moveMarioVertically).not.toBeCalled();
    });
  })
});
