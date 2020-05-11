import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ImageStyle,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import theme from '../utils/Theme';

interface IProps {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftIconStyle?: ImageStyle;
  rightIconStyle?: ImageStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
  touchableStyle?: ViewStyle;
  text: string;
  onPress?: () => void;
}

interface IState {}

class IconButton extends React.Component<IProps, IState> {
  render = () => {
    const {
      leftIcon,
      rightIcon,
      leftIconStyle,
      rightIconStyle,
      textStyle,
      text,
      touchableStyle,
      style,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={touchableStyle}>
        <View style={[styles.buttonContainer, style]}>
          {leftIcon ? (
            <Image
              style={[styles.buttonImage, leftIconStyle]}
              source={leftIcon}
            />
          ) : (
            <View style={{width: 24}} />
          )}

          <Text style={[styles.buttonText, textStyle]}>{text}</Text>

          {rightIcon ? (
            <Image
              style={[styles.buttonImage, rightIconStyle]}
              source={rightIcon}
            />
          ) : (
            <View style={{width: 24}} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
}

export default IconButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.28,
    color: theme.colors.primary,
  },
  buttonContainer: {
    height: 60,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
