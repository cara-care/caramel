import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  RegisteredStyle,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
  androidStatusBarMargin?: boolean;
  iosStatusBarColor?: string;
  iosBottomSafeArea?: boolean;
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

    return (
      <>
        {iosStatusBarColor && (
          <SafeAreaView
            forceInset={{top: 'always', bottom: 'never'}}
            style={{flex: 0, backgroundColor: iosStatusBarColor}}
          />
        )}
        <SafeAreaView
          forceInset={{
            top: iosStatusBarColor ? 'never' : 'always',
            bottom: this.props.iosBottomSafeArea ? 'always' : 'never',
          }}
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
