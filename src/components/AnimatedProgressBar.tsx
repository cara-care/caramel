import React, {useState, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
  RegisteredStyle,
} from 'react-native';
import theme from '../utils/Theme';

interface OwnProps {
  percentage: number;
  style?: ViewStyle;
  separatorStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
  background?: ViewStyle;
  foreground?: ViewStyle;
}

const AnimatedProgressBar = (props: OwnProps) => {
  const [currentWidthAnim] = useState(new Animated.Value(0));
  const [interpolateBar] = useState(
    currentWidthAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  );

  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    animateWidth();
  });

  const animateWidth = () => {
    let widthPercentage = props.percentage;
    if (currentWidth === widthPercentage) {
      return;
    }
    setCurrentWidth(widthPercentage);

    if (widthPercentage !== 0) {
      let animate = Animated.spring(currentWidthAnim, {
        toValue: widthPercentage,
      });
      animate.start();
    } else {
      currentWidthAnim.setValue(0);
    }
  };

  return (
    <View style={props.style}>
      <Animated.View
        style={[
          {width: interpolateBar},
          separatorStyles.progressSeparator,
          props.foreground,
        ]}
      />
      <View
        style={[
          separatorStyles.topSeparator,
          props.background,
          props.separatorStyle,
        ]}
      />
    </View>
  );
};

export default AnimatedProgressBar;

export const separatorStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topSeparator: {
    height: 1,
    backgroundColor: 'black',
    opacity: 0.25,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  progressSeparator: {
    height: 2,
    backgroundColor: theme.colors.primary,
    zIndex: 10,
  },
});
