import React from 'react';
import PropTypes from 'prop-types';
import mushroom from '../../../assets/images/green-mushroom.png';
import mario from '../../../assets/images/mario.png';
import './Cell.css';

class Cell extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  render () {
    const { value } = this.props;
    return (
      <span className="cell">
        { value === 'mushroom' && <img src={mushroom} alt="mushroom" width="25" /> }
        { value === 'mario' && <img src={mario} alt="mario" width="25" /> }
      </span>
    );
  }
}

export default Cell;
