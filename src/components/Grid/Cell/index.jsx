import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

class Cell extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  render () {
    return (
      <span className="cell" />
    );
  }
}

export default Cell;
