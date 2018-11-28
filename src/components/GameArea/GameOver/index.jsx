import React from 'react';
import PropTypes from 'prop-types';
import './GameOver.css';

class GameEnded extends React.PureComponent {
  static propTypes = {
    moveCount: PropTypes.number.isRequired,
    resetBoard: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="game-over">
        <h4>Game completed in {this.props.moveCount} moves!</h4>

        <button
          className="btn secondary-btn game-over-btn"
          id="restart"
          onClick={this.props.resetBoard}
        >
          Restart Game
        </button>
        <button
          className="btn secondary-btn game-over-btn"
          id="change-board"
          onClick={this.props.resetGame}
        >
          Change board size
        </button>
      </div>
    );
  }
}

export default GameEnded;
