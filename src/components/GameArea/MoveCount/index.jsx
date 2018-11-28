import React from 'react';
import PropTypes from 'prop-types';
import './MoveCount.css';

class MoveCount extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  render () {
    return (
      <div className="move-count">Moves: {this.props.count}</div>
    )
  }
}

export default MoveCount;
