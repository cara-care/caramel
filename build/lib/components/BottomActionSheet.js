"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const organisms_1 = require("../organisms");
class IOSProps {
    constructor() {
        this.destructiveButtonIndex = undefined;
        this.cancelButtonIndex = undefined;
    }
}
class BottomActionSheet extends react_1.Component {
    constructor(props) {
        super(props);
        this.ANDROID_SHEET_BUTTON_HEIGHT = 75;
        this.ios = new IOSProps();
        this.openSheet = () => {
            const { options, onPressWithIndex } = this.props;
            if (react_native_1.Platform.OS === 'ios') {
                react_native_1.ActionSheetIOS.showActionSheetWithOptions({
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
            if (this.bottomSheetAndroid && react_native_1.Platform.OS !== 'ios')
                this.bottomSheetAndroid.close();
        };
        this.ios.destructiveButtonIndex = props.ios.destructiveButtonIndex;
        this.ios.cancelButtonIndex = props.cancelButtonIndex;
    }
    render() {
        const { android, onPressWithIndex, options, cancelButtonIndex } = this.props;
        return (react_1.default.createElement(react_native_1.View, null, react_native_1.Platform.OS !== 'ios' && (react_1.default.createElement(organisms_1.BottomSheetAndroid, { ref: ref => {
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
exports.default = BottomActionSheet;
//# sourceMappingURL=BottomActionSheet.js.map