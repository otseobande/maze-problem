import React from 'react';
import DimensionDialog from '../DimensionDialog';

class GameArea extends React.Component {
  state = {
    height: 10,
    width: 10
  }

  /**
   * Handles dimension input change and sets value to state
   *
   * @param {Event} event
   *
   * @returns {void}
   */
  handleDimensionChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) || 0 })
  }

  render () {
    return (
      <main>
        <DimensionDialog
          handleInputChange={this.handleDimensionChange}
          height={this.state.height}
          width={this.state.width}
          startGame={() => null}
        />
      </main>
    );
  }
}

export default GameArea;