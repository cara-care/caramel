import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, } from 'react-native';
import { SafeAreaView } from 'react-navigation';
class Container extends Component {
    render() {
        const { bgColor, androidStatusBarMargin, iosStatusBarColor, style, children, } = this.props;
        const computedStyles = [style, styles.container];
        if (androidStatusBarMargin) {
            computedStyles.push(styles.androidStatusBarMargin);
        }
        return (React.createElement(React.Fragment, null,
            iosStatusBarColor && (React.createElement(SafeAreaView, { forceInset: { top: 'always', bottom: 'never' }, style: { flex: 0, backgroundColor: iosStatusBarColor } })),
            React.createElement(SafeAreaView, { forceInset: {
                    top: iosStatusBarColor ? 'never' : 'always',
                    bottom: this.props.iosBottomSafeArea ? 'always' : 'never',
                }, style: [styles.root, { backgroundColor: bgColor }] },
                React.createElement(View, { style: computedStyles }, children))));
    }
}
Container.defaultProps = {
    bgColor: '#fff',
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
    },
    // Fixes the status bar overlap:
    // eg: https://github.com/GeekyAnts/NativeBase/issues/899
    androidStatusBarMargin: Object.assign({}, Platform.select({
        android: {
            marginTop: StatusBar.currentHeight,
        },
    })),
});
export default Container;
//# sourceMappingURL=Container.js.map