"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_navigation_1 = require("react-navigation");
var Container = /** @class */function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.render = function () {
        var _a = this.props,
            bgColor = _a.bgColor,
            androidStatusBarMargin = _a.androidStatusBarMargin,
            iosStatusBarColor = _a.iosStatusBarColor,
            style = _a.style,
            children = _a.children;
        var computedStyles = [style, styles.container];
        if (androidStatusBarMargin) {
            computedStyles.push(styles.androidStatusBarMargin);
        }
        return react_1.default.createElement(react_1.default.Fragment, null, iosStatusBarColor && react_1.default.createElement(react_navigation_1.SafeAreaView, { forceInset: { top: 'always', bottom: 'never' }, style: { flex: 0, backgroundColor: iosStatusBarColor } }), react_1.default.createElement(react_navigation_1.SafeAreaView, { forceInset: {
                top: iosStatusBarColor ? 'never' : 'always',
                bottom: this.props.iosBottomSafeArea ? 'always' : 'never'
            }, style: [styles.root, { backgroundColor: bgColor }] }, react_1.default.createElement(react_native_1.View, { style: computedStyles }, children)));
    };
    Container.defaultProps = {
        bgColor: '#fff'
    };
    return Container;
}(react_1.Component);
var styles = react_native_1.StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flexGrow: 1
    },
    // Fixes the status bar overlap:
    // eg: https://github.com/GeekyAnts/NativeBase/issues/899
    androidStatusBarMargin: __assign({}, react_native_1.Platform.select({
        android: {
            marginTop: react_native_1.StatusBar.currentHeight
        }
    }))
});
exports.default = Container;
//# sourceMappingURL=Container.js.map
//# sourceMappingURL=Container.js.map