import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Animated,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import theme from '../utils/Theme';
import {MAX_HEADER_HEIGHT, HEADER_DELTA} from '../utils/Calculations';

interface Props {
  y: Animated.Value;
  image: ImageSourcePropType;
  imageStyle?: ImageStyle;
  imageContainerStyle?: ViewStyle;
}

const CoverImage: React.FC<Props> = ({
  y,
  image,
  imageStyle,
  imageContainerStyle,
}) => {
  const scale = y.interpolate({
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });
  const opacity = y.interpolate({
    inputRange: [0, HEADER_DELTA],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.root, {transform: [{scale}]}, imageContainerStyle]}>
      {image ? (
        <Image source={image} style={[styles.image, imageStyle]} />
      ) : (
        <View style={styles.image} />
      )}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#fff',
          opacity,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.skeleton,
    width: undefined,
    height: undefined,
  },
});

export default CoverImage;
