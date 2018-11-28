import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Cell from '../Cell';
import './Row.css';

class Row extends React.PureComponent {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render () {
    return (
      <div className="row">
        {
          this.props.values.map(value => (
            <Cell
              key={`cell-${shortid.generate()}`}
              value={value}
            />
          ))
        }
      </div>
    );
  }
}

export default Row;
