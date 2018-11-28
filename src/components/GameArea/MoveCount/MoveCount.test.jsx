import React from 'react';
import { shallow } from 'enzyme';
import MoveCount from '.';

describe('The MoveCount component', () => {
  it('should display correct move count text', () => {
    const wrapper = shallow(<MoveCount count={4} />);

    expect(wrapper.find('.move-count').text()).toEqual('Moves: 4');
  })
});