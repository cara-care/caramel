import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import {TouchableBreath} from '../src/';

describe('<TouchableBreath />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TouchableBreath>
          <Text>TouchableBreath</Text>
        </TouchableBreath>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
