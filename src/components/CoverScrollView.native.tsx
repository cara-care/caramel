import React from 'react';
import {
  View,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import {CoverImage} from '../organisms';
import {MAX_HEADER_HEIGHT} from '../utils/Calculations';

interface IProps {
  style?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  imageContainerStyle?: ViewStyle;
  image: ImageSourcePropType;
}

interface IState {}

class CoverScrollView extends React.Component<IProps, IState> {
  private y = new Animated.Value(0);
  private onScroll = (contentOffset: {x: Animated.Value; y: Animated.Value}) =>
    Animated.event([{nativeEvent: {contentOffset}}], {useNativeDriver: false});

  render = () => {
    const {
      style,
      scrollViewStyle,
      imageStyle,
      imageContainerStyle,
      image,
    } = this.props;

    return (
      <View style={style}>
        <CoverImage
          image={image}
          {...{y: this.y}}
          imageContainerStyle={imageContainerStyle}
          imageStyle={imageStyle}
        />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollView, scrollViewStyle]}
          scrollEventThrottle={16}
          onScroll={this.onScroll({y: this.y, x: new Animated.Value(0)})}>
          <View style={{height: MAX_HEADER_HEIGHT}} />
          {this.props.children}
        </Animated.ScrollView>
      </View>
    );
  };
}

export default CoverScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});
