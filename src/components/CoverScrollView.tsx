import React from 'react';
import {View, ViewStyle, ImageSourcePropType, ImageStyle} from 'react-native';

interface IProps {
  style?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  imageContainerStyle?: ViewStyle;
  image: ImageSourcePropType;
}

interface IState {}

class CoverScrollView extends React.Component<IProps, IState> {
  render() {
    return <View />;
  }
}

export default CoverScrollView;
