import React from 'react';
import {View, StyleProp} from 'react-native';

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
  onValueChange: (value: number) => void;
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
  render() {
    return <View />;
  }
}
