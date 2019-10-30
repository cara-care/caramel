"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
class Container extends react_1.Component {
    render() {
        const { bgColor, androidStatusBarMargin, iosStatusBarColor, style, children, } = this.props;
        const computedStyles = [style, styles.container];
        if (androidStatusBarMargin) {
            computedStyles.push(styles.androidStatusBarMargin);
        }
        return (<>
        {iosStatusBarColor && (<react_navigation_1.SafeAreaView forceInset={{ top: 'always', bottom: 'never' }} style={{ flex: 0, backgroundColor: iosStatusBarColor }}/>)}
        <react_navigation_1.SafeAreaView forceInset={{
            top: iosStatusBarColor ? 'never' : 'always',
            bottom: this.props.iosBottomSafeArea ? 'always' : 'never',
        }} style={[styles.root, { backgroundColor: bgColor }]}>
          <react_native_1.View style={computedStyles}>{children}</react_native_1.View>
        </react_navigation_1.SafeAreaView>
      </>);
    }
}
Container.defaultProps = {
    bgColor: '#fff',
};
const styles = react_native_1.StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
    },
    // Fixes the status bar overlap:
    // eg: https://github.com/GeekyAnts/NativeBase/issues/899
    androidStatusBarMargin: Object.assign({}, react_native_1.Platform.select({
        android: {
            marginTop: react_native_1.StatusBar.currentHeight,
        },
    })),
});
exports.default = Container;
//# sourceMappingURL=Container.js.map