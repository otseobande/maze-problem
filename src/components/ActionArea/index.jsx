import React from 'react';
import DimensionDialog from '../DimensionDialog';
import GameArea from '../GameArea';

class ActionArea extends React.Component {
  state = {
    height: 10,
    width: 10,
    gameStarted: false,
    gameBoard: []
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
    this.updateGameBoard();
  }

  /**
   * Updates game board with height and width
   *
   * @returns {void}
   */
  updateGameBoard = () => {
    this.setState(prevState => ({
      gameBoard: Array.from(
        { length: prevState.height },
        () => Array.from({ length: prevState.width }, () => 'empty'),
      ),
    }));
  }

  render () {
    return (
      <main>
        {
          this.state.gameStarted
            ? <GameArea
                gameBoard={this.state.gameBoard}
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
