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
  private ANDROID_SHEET_BUTTON_HEIGHT = 75;
  static defaultProps: IProps;
  private bottomSheetAndroid?: BottomSheetAndroid;

  private ios: IOSProps = new IOSProps();

  constructor(props: IProps) {
    super(props);

    this.ios.destructiveButtonIndex = props.ios!.destructiveButtonIndex;
    this.ios.cancelButtonIndex = props.cancelButtonIndex;
  }

  openSheet = () => {
    const {options, onPressWithIndex} = this.props;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: options,
          destructiveButtonIndex: this.ios.destructiveButtonIndex,
          cancelButtonIndex: this.ios.cancelButtonIndex,
        },
        onPressWithIndex!,
      );
    } else if (this.bottomSheetAndroid) {
      this.bottomSheetAndroid.open();
    }
  };

  closeSheet = () => {
    if (this.bottomSheetAndroid && Platform.OS !== 'ios')
      this.bottomSheetAndroid.close();
  };

  render() {
    const {android, onPressWithIndex, options, cancelButtonIndex} = this.props;
    return (
      <View>
        {Platform.OS !== 'ios' && (
          <BottomSheetAndroid
            ref={ref => {
              if (ref !== null) this.bottomSheetAndroid = ref;
            }}
            options={options}
            onPressWithIndex={onPressWithIndex}
            minClosingHeight={android!.minClosingHeight}
            duration={android!.duration}
            onClose={android!.onClose}
            closeOnDragDown={android!.closeOnDragDown}
            closeOnPressMask={android!.closeOnPressMask}
            closeOnPressBack={android!.closeOnPressBack}
            closeOnButtonPress={android!.closeOnButtonPress}
            animationType={android!.animationType}
            customStyles={android!.customStyles}
            cancelButtonIndex={cancelButtonIndex}
            buttonHeight={this.ANDROID_SHEET_BUTTON_HEIGHT}
          />
        )}
      </View>
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
