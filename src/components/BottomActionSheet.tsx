import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';

interface CustomStyle {
  wrapper?: ViewStyle;
  container?: ViewStyle;
  draggableIcon?: ViewStyle;
}

interface IProps {
  options: Array<string>;
  ios?: {
    destructiveButtonIndex?: number;
  };
  cancelButtonIndex?: number;
  android?: {
    minClosingHeight?: number;
    duration?: number;
    onClose: (() => void) | null;
    closeOnDragDown?: boolean;
    closeOnPressMask?: boolean;
    closeOnPressBack?: boolean;
    closeOnButtonPress?: boolean;
    animationType?: 'none' | 'slide' | 'fade' | undefined;
    customStyles?: CustomStyle;
  };
  onPressWithIndex: (buttonIndex: number) => void;
}

class BottomActionSheet extends Component<IProps, any> {
  render() {
    return <View />;
  }
}
export default BottomActionSheet;
