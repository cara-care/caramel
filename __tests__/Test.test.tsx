import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Text} from '../src/';

describe('<Container />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Text>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
