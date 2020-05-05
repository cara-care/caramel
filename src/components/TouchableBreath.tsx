import React, {useRef, useCallback} from 'react';
import {
  TouchableOpacity,
  Animated,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

interface IPressProps {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export type TouchableBreathProps = TouchableOpacityProps & IPressProps;

/**
 * A wrapper around TouchableOpacity with an animated wrapped view.
 * On press down the wrapped view is scaled down.
 * On press out the wrapped view is scaled back to 1.
 *
 */
export const TouchableBreath: React.FC<TouchableBreathProps> = ({
  delayLongPress,
  delayPressIn,
  delayPressOut,
  disabled,
  hitSlop,
  onBlur,
  onFocus,
  onLayout,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  style,
  pressRetentionOffset,
  testID,
  activeOpacity,
  ...rest
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => callback && callback());
    },
    [animation],
  );

  const handleOnPressIn = useCallback(
    (_: GestureResponderEvent) => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start(() => onPressIn && onPressIn());
    },
    [animation, onPressIn],
  );

  const handleOnPress = useCallback(
    (_: GestureResponderEvent) => {
      animateOut(onPress);
    },
    [animateOut, onPress],
  );

  const handleOnPressOut = useCallback(
    (_: GestureResponderEvent) => {
      animateOut(onPressOut);
    },
    [animateOut, onPressOut],
  );

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <TouchableOpacity
      onPressIn={handleOnPressIn}
      onPress={handleOnPress}
      onPressOut={handleOnPressOut}
      activeOpacity={activeOpacity}
      delayLongPress={delayLongPress}
      delayPressIn={delayPressIn}
      delayPressOut={delayPressOut}
      disabled={disabled}
      hitSlop={hitSlop}
      onBlur={onBlur}
      onFocus={onFocus}
      onLayout={onLayout}
      onLongPress={onLongPress}
      pressRetentionOffset={pressRetentionOffset}
      testID={testID}>
      <Animated.View style={[style, {transform: [{scale}]}]} {...rest} />
    </TouchableOpacity>
  );
};
