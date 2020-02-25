import React, {Component} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import theme from '../utils/Theme';

interface IProps {
  style?: ViewStyle;
  scoreBackgroundStyle?: ViewStyle;
  scoreSeparatorStyle?: ViewStyle;
  pointViewStyle?: ViewStyle;
  percentage: number;
  middleCount: number;
  color?: string;
}

interface IState {}

export default class OneLineScore extends Component<IProps, IState> {
  render() {
    const {
      style,
      scoreBackgroundStyle,
      scoreSeparatorStyle,
      middleCount,
      percentage,
      pointViewStyle,
      color,
    } = this.props;

    let middleViews: Element[] = [];
    for (const key of Array(middleCount).keys()) {
      middleViews.push(
        <View
          key={key.toString() + 'background'}
          style={[styles.scoreBackground, scoreBackgroundStyle]}
        />,
        <View
          key={key.toString() + 'separator'}
          style={[styles.scoreSeparator, scoreSeparatorStyle]}
        />,
      );
    }

    return (
      <View style={style}>
        <View
          style={[
            styles.scoreBackground,
            styles.topScoreBackground,
            scoreBackgroundStyle,
          ]}
        />
        <View style={[styles.scoreSeparator, scoreSeparatorStyle]} />
        {middleViews}
        <View
          style={[
            styles.scoreBackground,
            styles.bottomScoreBackground,
            scoreBackgroundStyle,
          ]}
        />

        <View
          style={[
            {
              height: percentage.toString() + '%',

              shadowColor: color || theme.colors.carrotRed,
              backgroundColor: color || theme.colors.carrotRed,
            },
            styles.pointBar,
            pointViewStyle,
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pointBar: {
    width: 32,
    borderWidth: 0,
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 11,
    elevation: 5,
  },
  scoreSeparator: {
    height: 1,
    backgroundColor: 'white',
    zIndex: 3,
  },
  bottomScoreBackground: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topScoreBackground: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scoreBackground: {
    width: 32,
    height: 58,
    backgroundColor: '#525d7e',
    opacity: 0.1,
    borderWidth: 0,
    zIndex: 1,
  },
});
