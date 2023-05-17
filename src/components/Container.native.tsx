import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  RegisteredStyle,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  bgColor?: string;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
  androidStatusBarMargin?: boolean;
  iosStatusBarColor?: string;
  bottomSafeArea?: boolean;
}

class Container extends Component<Props> {
  static defaultProps = {
    bgColor: '#fff',
  };

  render() {
    const {
      bgColor,
      androidStatusBarMargin,
      iosStatusBarColor,
      style,
      children,
    } = this.props;
    const computedStyles = [style, styles.container];

    if (androidStatusBarMargin) {
      computedStyles.push(styles.androidStatusBarMargin);
    }

    let edges: Edge[] = [];
    if (!iosStatusBarColor) edges.push('top');
    if (this.props.bottomSafeArea) edges.push('bottom');

    return (
      <>
        {iosStatusBarColor && (
          <SafeAreaView
            edges={['top']}
            style={{flex: 0, backgroundColor: iosStatusBarColor}}
          />
        )}
        <SafeAreaView
          edges={edges}
          style={[styles.root, {backgroundColor: bgColor}]}>
          <View style={computedStyles}>{children}</View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  // Fixes the status bar overlap:
  // eg: https://github.com/GeekyAnts/NativeBase/issues/899
  androidStatusBarMargin: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
});

export default Container;
