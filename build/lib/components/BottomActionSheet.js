import React, { Component } from 'react';
import { View, Platform, ActionSheetIOS } from 'react-native';
import { BottomSheetAndroid } from '../organisms';
class IOSProps {
    constructor() {
        this.destructiveButtonIndex = undefined;
        this.cancelButtonIndex = undefined;
    }
}
class BottomActionSheet extends Component {
    constructor(props) {
        super(props);
        this.ANDROID_SHEET_BUTTON_HEIGHT = 75;
        this.ios = new IOSProps();
        this.openSheet = () => {
            const { options, onPressWithIndex } = this.props;
            if (Platform.OS === 'ios') {
                ActionSheetIOS.showActionSheetWithOptions({
                    options: options,
                    destructiveButtonIndex: this.ios.destructiveButtonIndex,
                    cancelButtonIndex: this.ios.cancelButtonIndex,
                }, onPressWithIndex);
            }
            else if (this.bottomSheetAndroid) {
                this.bottomSheetAndroid.open();
            }
        };
        this.closeSheet = () => {
            if (this.bottomSheetAndroid && Platform.OS !== 'ios')
                this.bottomSheetAndroid.close();
        };
        this.ios.destructiveButtonIndex = props.ios.destructiveButtonIndex;
        this.ios.cancelButtonIndex = props.cancelButtonIndex;
    }
    render() {
        const { android, onPressWithIndex, options, cancelButtonIndex } = this.props;
        return (React.createElement(View, null, Platform.OS !== 'ios' && (React.createElement(BottomSheetAndroid, { ref: ref => {
                if (ref !== null)
                    this.bottomSheetAndroid = ref;
            }, options: options, onPressWithIndex: onPressWithIndex, minClosingHeight: android.minClosingHeight, duration: android.duration, onClose: android.onClose, closeOnDragDown: android.closeOnDragDown, closeOnPressMask: android.closeOnPressMask, closeOnPressBack: android.closeOnPressBack, closeOnButtonPress: android.closeOnButtonPress, animationType: android.animationType, customStyles: android.customStyles, cancelButtonIndex: cancelButtonIndex, buttonHeight: this.ANDROID_SHEET_BUTTON_HEIGHT }))));
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
    onPressWithIndex: _ => { },
};
export default BottomActionSheet;
//# sourceMappingURL=BottomActionSheet.js.map