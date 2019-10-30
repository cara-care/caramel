import React, {PureComponent} from 'react';
import {View, StyleProp, StyleSheet} from 'react-native';
import theme from '../utils/Theme';
import {Text} from '../';
const RNSlider = require('react-native-slider');

interface IProps {
  thumbStyle?: StyleProp<any>;
  thumbTextStyle?: StyleProp<any>;
  trackStyle?: StyleProp<any>;
  tooltipStyle?: StyleProp<any>;
  leftTextStyle?: StyleProp<any>;
  rightTextStyle?: StyleProp<any>;
  minimum: number;
  maximum: number;
  onValueChange: (value: number) => void;
  thumbWidth?: number;
  existingValue?: number;
  leftText?: string;
  rightText?: string;
  showTooltipOnSlide?: boolean;
  step?: number;
}

enum ShowHide {
  SHOW = 'flex',
  HIDE = 'none',
}

interface IState {
  value: number;
  componentWidth: number;
  textWidth: number;
  showTooltip: ShowHide;
}

export default class Slider extends PureComponent<IProps, IState> {
  static defaultProps = {
    step: 1,
    thumbWidth: 50,
    showTooltipOnSlide: true,
  };

  state = {
    showTooltip: ShowHide.HIDE,
    value: this.props.existingValue
      ? this.props.existingValue - this.props.minimum
      : 0,
    componentWidth: 0,
    textWidth: 0,
  };

  render() {
    const {
      minimum,
      maximum,
      thumbWidth,
      leftText,
      rightText,
      showTooltipOnSlide,
      leftTextStyle,
      rightTextStyle,
    } = this.props;
    const division = maximum - minimum;
    const textLeftCalculation = thumbWidth
      ? ((this.state.componentWidth - thumbWidth) / division) *
          this.state.value +
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
      tooltipStyle,
      onValueChange,
      step,
    } = this.props;
    return (
      <View>
        <View style={styles.topTextsContainer}>
          {leftTopText}
          {rightTopText}
        </View>
        <View
          onLayout={event => {
            let {width} = event.nativeEvent.layout;
            this.setState({componentWidth: width});
          }}>
          <RNSlider
            value={this.state.value}
            minimumValue={0}
            maximumValue={maximum - minimum}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={'rgb(224, 247, 247)'}
            step={step}
            thumbStyle={[thumbStyle, {width: thumbWidth}]}
            trackStyle={[trackStyle, styles.trackStyle]}
            onValueChange={(value: number) => {
              this.setState({value: value});
              onValueChange(value + minimum);
            }}
            onSlidingStart={() => {
              this.setState({showTooltip: ShowHide.SHOW});
            }}
            onSlidingComplete={() => {
              this.setState({showTooltip: ShowHide.HIDE});
            }}
          />
          <View
            pointerEvents={'none'}
            onLayout={event => {
              let {width} = event.nativeEvent.layout;
              this.setState({textWidth: width});
            }}
            style={[
              styles.thumbTextContainer,
              {
                left: textLeftCalculation,
              },
            ]}>
            <Text type="small" style={[thumbTextStyle, styles.thumbText]}>
              {this.state.value + minimum}
            </Text>
            {showTooltipOnSlide && (
              <View style={[styles.tooltip, {display: this.state.showTooltip}]}>
                <Text type="header4" style={[tooltipStyle, styles.tooltipText]}>
                  {this.state.value + minimum}
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
