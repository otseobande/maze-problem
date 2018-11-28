import React from 'react';
import DimensionDialog from '../DimensionDialog';
import GameArea from '../GameArea';

class ActionArea extends React.Component {
  state = {
    height: 10,
    width: 10,
    gameStarted: false,
    areAllMushroomsCollected: false,
    gameBoard: [],
    moveCount: 0,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  /**
   * Handles dimension input change and sets value to state
   *
   * @param {Event} event
   *
   * @returns {void}
   */
  handleDimensionChange = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value, 10) || 0
    });
  }

  /**
   * Runs necessary operations to start game
   *
   * @returns {void}
   */
  startGame = () => {
    this.setState({ gameStarted: true });
    this.setupGameBoard();
  }

  /**
   * Updates game board with height and width
   *
   * @returns {void}
   */
  setupGameBoard = () => {
    const { height, width } = this.state;

    const gameBoard = Array.from(
      { length: height },
      () => Array.from({ length: width }, () => 'empty'),
    );

    const getRandomInt = (min, max) => {
      const ceilMin = Math.ceil(min);
      const floorMax = Math.floor(max);

      return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
    }

    // randomly distributing the mushrooms
    for (let i = 1; i <= height; i++) {
      const randomRowIndex = getRandomInt(0, height - 1);
      const randomColumnIndex = getRandomInt(0, width - 1);

      gameBoard[randomRowIndex][randomColumnIndex] = 'mushroom';
    }

    const middleHeight = Math.floor(height / 2);
    const middleWidth = Math.floor(width / 2);

    // placing the mario character
    gameBoard[middleHeight][middleWidth] = 'mario';

    this.setState({ gameBoard, moveCount: 0 });
  }

  /**
   * Updates gameBoard state
   *
   * @param {string} board
   *
   * @returns {void}
   */
  updateGameBoardState = (board) => {
    this.setState((prevState) => ({
      gameBoard: board,
      moveCount: prevState.moveCount + 1,
      areAllMushroomsCollected: !prevState.gameBoard.some(row => {
        return row.some(value => value === 'mushroom');
      })
    }));
  }

  /**
   * Handles moving the mario player icon vertically
   *
   * @param {string} direction
   *
   * @returns {void}
   */
  moveMarioVertically = (direction) => {
    const board = [ ...this.state.gameBoard ];
    const marioRowIndex = board.findIndex(row => row.some(value => value === 'mario'));
    const nextRowIndex = direction === 'up'
      ? marioRowIndex - 1
      : marioRowIndex + 1;

    if(board[marioRowIndex] && board[nextRowIndex]) {
      const marioColumnIndex = board[marioRowIndex].findIndex(value => value === 'mario');

      board[marioRowIndex][marioColumnIndex] = 'empty';
      board[nextRowIndex][marioColumnIndex] = 'mario';

      this.updateGameBoardState(board);
    }
  }

  /**
   * Handles moving the mario player icon horizontally
   *
   * @param {string} direction
   *
   * @returns {void}
   */
  moveMarioHorizontally = (direction) => {
    const board = [ ...this.state.gameBoard ];
    const marioRowIndex = board.findIndex(row => row.some(value => value === 'mario'));
    const marioColumnIndex = board[marioRowIndex].findIndex(value => value === 'mario');
    const nextColumnIndex = direction === 'left'
      ? marioColumnIndex - 1
      : marioColumnIndex + 1;

    if(board[marioRowIndex] && board[marioRowIndex][nextColumnIndex]) {
      board[marioRowIndex][marioColumnIndex] = 'empty';
      board[marioRowIndex][nextColumnIndex] = 'mario';

      this.updateGameBoardState(board);
    }
  }

  /**
   * Handles key press on page
   *
   * @returns {void}
   */
  handleKeyDown = (event) => {
    const { key } = event;

    if (this.state.gameStarted) {
      switch (key) {
        case 'ArrowUp':
          return this.moveMarioVertically('up');
        case 'ArrowDown':
          return this.moveMarioVertically('down');
        case 'ArrowLeft':
          return this.moveMarioHorizontally('left');
        case 'ArrowRight':
          return this.moveMarioHorizontally('right');
        default:
          return;
      }
    }
  }

  resetBoard = () => {
    this.setupGameBoard();
    this.setState({
      areAllMushroomsCollected: false
    });
  }

  resetGame = () => {
    this.setState({
      gameStarted: false,
      areAllMushroomsCollected: false,
      gameBoard: [],
      moveCount: 0,
    })
  }

  render () {
    return (
      <main
        onKeyPress={this.handleKeyPress}
      >
        {
          this.state.gameStarted
            ? <GameArea
                gameBoard={this.state.gameBoard}
                moveCount={this.state.moveCount}
                areAllMushroomsCollected={this.state.areAllMushroomsCollected}
                resetBoard={this.resetBoard}
                resetGame={this.resetGame}
              />
            : <DimensionDialog
                handleInputChange={this.handleDimensionChange}
                height={this.state.height}
                width={this.state.width}
                startGame={this.startGame}
              />
        }
      </main>
    );
  }
}

export default ActionArea;
