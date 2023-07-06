import React from 'react';
import DimensionDialog from '../DimensionDialog';
import GameArea from '../GameArea';
import moveSound from '../../assets/sounds/move.wav';
import collectMushroom from '../../assets/sounds/collectMushroom.wav';
import stageClear from '../../assets/sounds/stageClear.wav';

class ActionArea extends React.Component {
  maxMoves = null;
  state = {
    height: 10,
    width: 10,
    gameStarted: false,
    areAllMushroomsCollected: false,
    gameBoard: [],
    moveCount: 0,
  }

  moveSound = new Audio(moveSound);
  collectMushroomSound = new Audio(collectMushroom);
  stageClearSound = new Audio(stageClear);

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleDimensionChange = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value, 10) || 0
    });
  }

  startGame = () => {
    this.setState({ gameStarted: true });
    this.setupGameBoard();
  }

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

    for (let i = 1; i <= height; i++) {
      const randomRowIndex = getRandomInt(0, height - 1);
      const randomColumnIndex = getRandomInt(0, width - 1);

      gameBoard[randomRowIndex][randomColumnIndex] = 'mushroom';
    }

    const middleHeight = Math.floor(height / 2);
    const middleWidth = Math.floor(width / 2);

    const minMoves = gameBoard.reduce((total, row, i) => {
      return total + row.reduce((rowTotal, cell, j) => {
        if (cell === 'mushroom') {
          const distance = Math.abs(middleHeight - i) + Math.abs(middleWidth - j);
          return rowTotal + distance;
        }
        return rowTotal;
      }, 0);
    }, 0);

    this.setState({ gameBoard, moveCount: 0, maxMoves: minMoves });
  }

  updateGameBoardState = (board) => {
    const areAllMushroomsCollected = !this.state.gameBoard.some(row => {
      return row.some(value => value === 'mushroom');
    });

    if (areAllMushroomsCollected) {
      this.stageClearSound.play();
    }

    this.setState((prevState) => ({
      gameBoard: board,
      moveCount: prevState.moveCount + 1,
      areAllMushroomsCollected
    }));

    if (prevState.moveCount + 1 > this.state.maxMoves) {
      this.setState({ gameStarted: false });
    }
  }

  moveMarioVertically = (direction) => {
    const board = [ ...this.state.gameBoard ];
    const marioRowIndex = board.findIndex(row => row.some(value => value === 'mario'));
    const nextRowIndex = direction === 'up'
      ? marioRowIndex - 1
      : marioRowIndex + 1;

    if(board[marioRowIndex] && board[nextRowIndex]) {
      const marioColumnIndex = board[marioRowIndex].findIndex(value => value === 'mario');

      if (board[nextRowIndex][marioColumnIndex] === 'mushroom') {
        this.collectMushroomSound.play();
      } else {
        this.moveSound.play();
      }

      board[marioRowIndex][marioColumnIndex] = 'empty';
      board[nextRowIndex][marioColumnIndex] = 'mario';

      this.updateGameBoardState(board);
    }
  }

  moveMarioHorizontally = (direction) => {
    const board = [ ...this.state.gameBoard ];
    const marioRowIndex = board.findIndex(row => row.some(value => value === 'mario'));
    const marioColumnIndex = board[marioRowIndex].findIndex(value => value === 'mario');
    const nextColumnIndex = direction === 'left'
      ? marioColumnIndex - 1
      : marioColumnIndex + 1;

    if(board[marioRowIndex] && board[marioRowIndex][nextColumnIndex]) {
      if (board[marioRowIndex][nextColumnIndex] === 'mushroom') {
        this.collectMushroomSound.play();
      } else {
        this.moveSound.play();
      }

      board[marioRowIndex][marioColumnIndex] = 'empty';
      board[marioRowIndex][nextColumnIndex] = 'mario';

      this.updateGameBoardState(board);
    }
  }

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
    this.stageClearSound.play()
    this.stageClearSound.pause();
    this.stageClearSound.currentTime = 0;

    this.setState({
      areAllMushroomsCollected: false
    });
  }

  resetGame = () => {
    this.stageClearSound.play();
    this.stageClearSound.pause();
    this.stageClearSound.currentTime = 0;

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

