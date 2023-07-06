import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import MoveCount from './MoveCount';
import GameOver from './GameOver';
import './GameArea.css';

class GameArea extends React.PureComponent {
  static propTypes = {
    gameBoard: PropTypes.arrayOf(PropTypes.array).isRequired,
    moveCount: PropTypes.number.isRequired,
    areAllMushroomsCollected: PropTypes.bool.isRequired,
    maxMoves: PropTypes.number.isRequired,
    resetBoard: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="game-area">
        <p className="instruction">
          Goal: Collect all mushrooms with the least moves possible.
        </p>
        {
          this.props.areAllMushroomsCollected
            ? <GameOver
                resetBoard={this.props.resetBoard}
                resetGame={this.props.resetGame}
                moveCount={this.props.moveCount}
              />
            : <>
                <button
                  className="btn secondary-btn game-btn"
                  onClick={this.props.resetBoard}
                >
                  Restart Game
                </button>
                <p>Max Moves: {this.props.maxMoves}</p>
                <MoveCount count={this.props.moveCount} />
                <button
                  className="btn secondary-btn game-btn"
                  onClick={this.props.resetGame}
                >
                  Change board size
                </button>
                <Grid gameBoard={this.props.gameBoard} />
              </>
        }
      </div>
    );
  }
}

export default GameArea;

