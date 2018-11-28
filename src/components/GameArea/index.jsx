import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import MoveCount from './MoveCount';
import './GameArea.css';

class GameArea extends React.PureComponent {
  static propTypes = {
    gameBoard: PropTypes.arrayOf(PropTypes.array).isRequired,
    moveCount: PropTypes.number.isRequired,
  }

  render () {
    return (
      <div className="game-area">
        <p className="instruction">
          Goal: Collect all mushrooms with the least moves possible.
        </p>
        <MoveCount count={this.props.moveCount} />
        <Grid gameBoard={this.props.gameBoard} />
      </div>
    );
  }
}

export default GameArea;
