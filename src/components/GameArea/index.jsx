import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import './GameArea.css';

class GameArea extends React.PureComponent {
  static propTypes = {
    gameBoard: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render () {
    return (
      <div className="game-area">
        <p className="instruction">
          Goal: Collect all mushrooms with the least moves possible.
        </p>
        <Grid gameBoard={this.props.gameBoard}/>
      </div>
    );
  }
}

export default GameArea;
