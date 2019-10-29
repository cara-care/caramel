"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var organisms_1 = require("../organisms");
var IOSProps = /** @class */ (function () {
    function IOSProps() {
        this.destructiveButtonIndex = undefined;
        this.cancelButtonIndex = undefined;
    }
    return IOSProps;
}());
var BottomActionSheet = /** @class */ (function (_super) {
    __extends(BottomActionSheet, _super);
    function BottomActionSheet(props) {
        var _this = _super.call(this, props) || this;
        _this.ANDROID_SHEET_BUTTON_HEIGHT = 75;
        _this.ios = new IOSProps();
        _this.openSheet = function () {
            var _a = _this.props, options = _a.options, onPressWithIndex = _a.onPressWithIndex;
            if (react_native_1.Platform.OS === 'ios') {
                react_native_1.ActionSheetIOS.showActionSheetWithOptions({
                    options: options,
                    destructiveButtonIndex: _this.ios.destructiveButtonIndex,
                    cancelButtonIndex: _this.ios.cancelButtonIndex,
                }, onPressWithIndex);
            }
            else if (_this.bottomSheetAndroid) {
                _this.bottomSheetAndroid.open();
            }
        };
        _this.closeSheet = function () {
            if (_this.bottomSheetAndroid && react_native_1.Platform.OS !== 'ios')
                _this.bottomSheetAndroid.close();
        };
        _this.ios.destructiveButtonIndex = props.ios.destructiveButtonIndex;
        _this.ios.cancelButtonIndex = props.cancelButtonIndex;
        return _this;
    }
    BottomActionSheet.prototype.render = function () {
        var _this = this;
        var _a = this.props, android = _a.android, onPressWithIndex = _a.onPressWithIndex, options = _a.options, cancelButtonIndex = _a.cancelButtonIndex;
        return (react_1.default.createElement(react_native_1.View, null, react_native_1.Platform.OS !== 'ios' && (react_1.default.createElement(organisms_1.BottomSheetAndroid, { ref: function (ref) {
                if (ref !== null)
                    _this.bottomSheetAndroid = ref;
            }, options: options, onPressWithIndex: onPressWithIndex, minClosingHeight: android.minClosingHeight, duration: android.duration, onClose: android.onClose, closeOnDragDown: android.closeOnDragDown, closeOnPressMask: android.closeOnPressMask, closeOnPressBack: android.closeOnPressBack, closeOnButtonPress: android.closeOnButtonPress, animationType: android.animationType, customStyles: android.customStyles, cancelButtonIndex: cancelButtonIndex, buttonHeight: this.ANDROID_SHEET_BUTTON_HEIGHT }))));
    };
    return BottomActionSheet;
}(react_1.Component));
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
    onPressWithIndex: function (_) { },
};
exports.default = BottomActionSheet;
//# sourceMappingURL=BottomActionSheet.js.map