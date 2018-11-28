import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Row from './Row';
import './Grid.css';

class Grid extends React.PureComponent {
  static propTypes = {
    gameBoard: PropTypes.arrayOf(PropTypes.array).isRequired,
  }

  render() {
    return (
      <div className="grid">
        {
          this.props.gameBoard.map((row, index) => (
            <Row
              key={`row-${shortid.generate()}`}
              values={row}
            />
          ))
        }
      </div>
    )
  }
}

export default Grid;
