import React, {Component} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import theme from '../utils/Theme';

interface IProps {
  style?: ViewStyle;
  scoreBackgroundStyle?: ViewStyle;
  scoreSeparatorStyle?: ViewStyle;
  pointViewStyle?: ViewStyle;
  firstPercentage: number;
  secondPercentage?: number;
  middleCount: number;
  firstColor?: string;
  secondColor?: string;
}

interface IState {}

export default class ThermoScore extends Component<IProps, IState> {
  render() {
    const {
      style,
      scoreBackgroundStyle,
      scoreSeparatorStyle,
      middleCount,
      firstPercentage,
      secondPercentage,
      pointViewStyle,
      firstColor,
      secondColor,
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
      <View style={[{alignItems: 'center'}, style]}>
        <View>
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
                height:
                  (secondPercentage
                    ? firstPercentage / 2
                    : firstPercentage
                  ).toString() + '%',

                bottom: secondPercentage ? '50%' : 0,
                shadowColor: firstColor || theme.colors.carrotRed,
                backgroundColor: firstColor || theme.colors.carrotRed,
                borderBottomLeftRadius: secondPercentage ? 0 : 16,
                borderBottomRightRadius: secondPercentage ? 0 : 16,
              },
              styles.pointBar,
              pointViewStyle,
            ]}
          />
          {!!secondPercentage && (
            <View
              style={[
                {
                  height: (secondPercentage / 2).toString() + '%',

                  top: '50%',
                  shadowColor: secondColor || theme.colors.carrotRed,
                  backgroundColor: secondColor || theme.colors.carrotRed,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
                styles.pointBar,
                pointViewStyle,
              ]}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pointBar: {
    width: 32,
    borderWidth: 0,
    position: 'absolute',
    zIndex: 2,

    borderRadius: 16,
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
