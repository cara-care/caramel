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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var ORIENTATIONS = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];
var BottomSheetAndroid = /** @class */ (function (_super) {
    __extends(BottomSheetAndroid, _super);
    function BottomSheetAndroid(props) {
        var _this = _super.call(this, props) || this;
        _this.height = 0;
        _this.state = {
            modalVisible: false,
            animatedHeight: new react_native_1.Animated.Value(0),
            pan: new react_native_1.Animated.ValueXY(),
        };
        _this.height = props.buttonHeight * props.options.length + 30;
        if (!_this.height) {
            _this.height = 300;
        }
        _this.createPanResponder(props);
        return _this;
    }
    BottomSheetAndroid.prototype.setModalVisible = function (visible) {
        var _this = this;
        var _a = this.props, minClosingHeight = _a.minClosingHeight, duration = _a.duration, onClose = _a.onClose;
        var _b = this.state, animatedHeight = _b.animatedHeight, pan = _b.pan;
        if (visible) {
            this.setState({ modalVisible: visible });
            react_native_1.Animated.timing(animatedHeight, {
                toValue: this.height,
                duration: duration,
            }).start();
        }
        else {
            react_native_1.Animated.timing(animatedHeight, {
                toValue: minClosingHeight,
                duration: duration,
            }).start(function () {
                pan.setValue({ x: 0, y: 0 });
                _this.setState({
                    modalVisible: visible,
                    animatedHeight: new react_native_1.Animated.Value(0),
                });
                if (typeof onClose === 'function') {
                    onClose();
                }
            });
        }
    };
    BottomSheetAndroid.prototype.createPanResponder = function (props) {
        var _this = this;
        var closeOnDragDown = props.closeOnDragDown;
        var pan = this.state.pan;
        this.panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () {
                return closeOnDragDown ? closeOnDragDown : false;
            },
            onPanResponderMove: function (e, gestureState) {
                if (gestureState.dy > 0) {
                    react_native_1.Animated.event([null, { dy: pan.y }])(e, gestureState);
                }
            },
            onPanResponderRelease: function (e, gestureState) {
                if (_this.height / 4 - gestureState.dy < 0) {
                    _this.setModalVisible(false);
                }
                else {
                    react_native_1.Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
                }
            },
        });
    };
    BottomSheetAndroid.prototype.open = function () {
        this.setModalVisible(true);
    };
    BottomSheetAndroid.prototype.close = function () {
        this.setModalVisible(false);
    };
    BottomSheetAndroid.prototype.render = function () {
        var _this = this;
        var _a = this.props, animationType = _a.animationType, closeOnPressMask = _a.closeOnPressMask, closeOnPressBack = _a.closeOnPressBack, closeOnButtonPress = _a.closeOnButtonPress, options = _a.options, customStyles = _a.customStyles, cancelButtonIndex = _a.cancelButtonIndex;
        var _b = this.state, animatedHeight = _b.animatedHeight, pan = _b.pan, modalVisible = _b.modalVisible;
        var panStyle = {
            transform: pan.getTranslateTransform(),
        };
        return (react_1.default.createElement(react_native_1.Modal, { transparent: true, animationType: animationType, visible: modalVisible, supportedOrientations: ORIENTATIONS, onRequestClose: function () {
                if (closeOnPressBack) {
                    _this.setModalVisible(false);
                }
            } },
            react_1.default.createElement(react_native_1.KeyboardAvoidingView, { enabled: react_native_1.Platform.OS === 'ios', behavior: "padding", style: [
                    styles.wrapper,
                    customStyles ? customStyles.wrapper : undefined,
                ] },
                react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.mask, activeOpacity: 1, onPress: function () { return (closeOnPressMask ? _this.close() : null); } }),
                react_1.default.createElement(react_native_1.Animated.View, __assign({}, (this.panResponder ? this.panResponder.panHandlers : undefined), { style: [
                        panStyle,
                        styles.container,
                        { height: animatedHeight },
                        customStyles ? customStyles.container : undefined,
                    ] }), options &&
                    options.map(function (option, index) { return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: index, onPress: function () {
                            if (index !== cancelButtonIndex) {
                                _this.props.onPressWithIndex(index);
                                if (closeOnButtonPress) {
                                    _this.close();
                                }
                            }
                            else if (cancelButtonIndex) {
                                _this.close();
                            }
                        }, style: [styles.button, { height: _this.props.buttonHeight }] },
                        react_1.default.createElement(react_native_1.Text, { style: styles.text }, option))); })))));
    };
    return BottomSheetAndroid;
}(react_1.Component));
var styles = react_native_1.StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 32,
        color: '#2e7df6',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#535D7E',
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#00000077',
    },
    mask: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 0,
        overflow: 'hidden',
    },
    draggableContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    draggableIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#ccc',
    },
});
exports.default = BottomSheetAndroid;
//# sourceMappingURL=BottomSheetAndroid.js.map