import React from 'react';
import PropTypes from 'prop-types';
import './DimensionDialog.css';

class DimensionDialog extends React.Component {
  static propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.startGame();
  }

  render () {
    return (
      <div className="dimension-dialog">
        <h3>Enter board dimensions</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="dimension-inputs">
            <div className="input-group">
              <label htmlFor="height">Height</label>
              <input
                name="height"
                type="number"
                onChange={this.props.handleInputChange}
                value={this.props.height}
                min={4}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="width">Width</label>
              <input
                name="width"
                type="number"
                onChange={this.props.handleInputChange}
                value={this.props.width}
                min={4}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn primary-btn start-game-btn" autoFocus>
            Start Game
          </button>
        </form>
      </div>
    );
  }
}


export default DimensionDialog;
