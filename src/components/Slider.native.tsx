import React from 'react';
import {
  View,
  StyleProp,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import theme from '../utils/Theme';
import {Text} from '../';
import RNSlider from 'react-native-slider';

interface IProps {
  thumbStyle?: StyleProp<any>;
  thumbTextStyle?: StyleProp<any>;
  trackStyle?: StyleProp<any>;
  tooltipContainerStyle?: StyleProp<any>;
  tooltipStyle?: StyleProp<any>;
  leftTextStyle?: StyleProp<any>;
  rightTextStyle?: StyleProp<any>;
  containerStyle?: StyleProp<any>;
  sliderContainerStyle?: StyleProp<any>;
  topTextsContainerStyle?: StyleProp<any>;
  sliderStyle?: StyleProp<any>;
  sliderTouchableStyle?: StyleProp<any>;
  tooltipText?: string;
  minimum: number;
  maximum: number;
  onValueChange?: (value: number) => void;
  onSlidingStart?: () => void;
  onSlidingComplete?: () => void;
  thumbWidth?: number;
  existingValue?: number;
  value?: number;
  leftText?: string;
  rightText?: string;
  showTooltipOnSlide?: boolean;
  showTooltipAlways?: boolean;
  step?: number;
  tintColor?: string;
}

interface IState {
  value: number;
  componentWidth: number;
  textWidth: number;
  showTooltip: boolean;
}

export default class Slider extends React.Component<IProps, IState> {
  static defaultProps = {
    step: 1,
    thumbWidth: 50,
    showTooltipOnSlide: true,
    showTooltipAlways: false,
  };

  state = {
    showTooltip: false,
    value:
      this.props.value ||
      (this.props.existingValue
        ? this.props.existingValue - this.props.minimum
        : 0),
    componentWidth: 0,
    textWidth: 0,
  };

  handleSliderTap = (e: GestureResponderEvent) => {
    e.persist();
    const {minimum, maximum, onValueChange} = this.props;
    const {componentWidth} = this.state;

    // Ensure that `value` is within the bounds of the min/max values.
    let value = Math.round(
      (e.nativeEvent.locationX * maximum) / componentWidth,
    );
    if (value < minimum) {
      value = minimum;
    } else if (value > maximum) {
      value = maximum;
    }

    if (!isNaN(value) && !!onValueChange) {
      this.setState({value}, () => {
        onValueChange(value);
      });
    }
  };

  render() {
    const {
      minimum,
      maximum,
      thumbWidth,
      leftText,
      rightText,
      showTooltipOnSlide,
      showTooltipAlways,
      leftTextStyle,
      rightTextStyle,
      containerStyle,
      sliderContainerStyle,
      topTextsContainerStyle,
      sliderStyle,
      sliderTouchableStyle,
    } = this.props;
    const division = maximum - minimum;

    const textLeftCalculation = thumbWidth
      ? ((this.state.componentWidth - thumbWidth) / division) *
          (this.props.value || this.state.value) +
        thumbWidth / 2 -
        this.state.textWidth / 2
      : 0;

    const leftTopText = leftText ? (
      <Text type="normal" style={[styles.topTexts, leftTextStyle]}>
        {leftText}
      </Text>
    ) : (
      <View />
    );
    const rightTopText = rightText ? (
      <Text type="normal" style={[styles.topTexts, rightTextStyle]}>
        {rightText}
      </Text>
    ) : (
      <View />
    );
    const {
      thumbStyle,
      trackStyle,
      thumbTextStyle,
      tooltipContainerStyle,
      tooltipStyle,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      step,
      tintColor,
      tooltipText,
    } = this.props;
    return (
      <View style={containerStyle}>
        <View style={[styles.topTextsContainer, topTextsContainerStyle]}>
          {leftTopText}
          {rightTopText}
        </View>
        <View
          style={sliderContainerStyle}
          onLayout={event => {
            let {width} = event.nativeEvent.layout;
            this.setState({componentWidth: width});
          }}>
          <TouchableWithoutFeedback
            style={sliderTouchableStyle}
            onPress={this.handleSliderTap}>
            <RNSlider
              value={this.props.value || this.state.value}
              style={sliderStyle}
              minimumValue={0}
              maximumValue={maximum - minimum}
              minimumTrackTintColor={
                tintColor ? tintColor : theme.colors.primary
              }
              maximumTrackTintColor={'rgb(224, 247, 247)'}
              step={step}
              thumbStyle={[thumbStyle, {width: thumbWidth}]}
              trackStyle={[styles.trackStyle, trackStyle]}
              onValueChange={(value: number) => {
                this.setState({value: value});
                if (!!onValueChange) {
                  onValueChange(value + minimum);
                }
              }}
              onSlidingStart={() => {
                this.setState({showTooltip: true});
                if (!!onSlidingStart) {
                  onSlidingStart();
                }
              }}
              onSlidingComplete={() => {
                this.setState({showTooltip: false});
                if (!!onSlidingComplete) {
                  onSlidingComplete();
                }
              }}
            />
          </TouchableWithoutFeedback>
          <View
            pointerEvents={'none'}
            onLayout={event => {
              let {width} = event.nativeEvent.layout;
              this.setState({textWidth: width});
            }}
            style={[styles.thumbTextContainer, {left: textLeftCalculation}]}>
            <Text type="small" style={[styles.thumbText, thumbTextStyle]}>
              {this.state.value + minimum}
            </Text>
            {(showTooltipAlways ||
              (showTooltipOnSlide && this.state.showTooltip)) && (
              <View style={[styles.tooltip, tooltipContainerStyle]}>
                <Text type="header4" style={[styles.tooltipText, tooltipStyle]}>
                  {tooltipText || this.state.value + minimum}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipText: {
    color: 'white',
  },
  tooltip: {
    height: 49,
    width: 49,
    backgroundColor: theme.colors.dusk,
    position: 'absolute',
    top: -75,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTextsContainer: {
    marginBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topTexts: {
    opacity: 0.8,
  },
  thumbTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  trackStyle: {
    borderRadius: 5,
    height: 10,
  },
  thumbText: {
    color: theme.colors.dusk,
  },
});
