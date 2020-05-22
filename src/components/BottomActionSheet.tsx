import React, {Component} from 'react';
import {View, Platform, ViewStyle, ActionSheetIOS} from 'react-native';
import {BottomSheetAndroid} from '../organisms';

interface CustomStyle {
  wrapper?: ViewStyle;
  container?: ViewStyle;
  draggableIcon?: ViewStyle;
}

class IOSProps {
  destructiveButtonIndex?: number = undefined;
  cancelButtonIndex?: number = undefined;
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
  static defaultProps: IProps;

  render() {
    return (
      <View />
    );
  }
}

BottomActionSheet.defaultProps = {
  ios: {
    destructiveButtonIndex: undefined,
  },
  cancelButtonIndex: undefined,
  android: {
    animationType: 'none',
    minClosingHeight: 0,
    duration: 300,
    closeOnDragDown: true,
    closeOnPressMask: true,
    closeOnPressBack: true,
    closeOnButtonPress: true,
    customStyles: {},
    onClose: null,
  },
  options: [],
  onPressWithIndex: _ => {},
};
export default BottomActionSheet;
