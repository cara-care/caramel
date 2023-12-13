import React, {Component} from 'react';
import {View} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

class Container extends Component<Props> {
  render() {
    return <View />;
  }
}

export default Container;
