import React, {Component} from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  regularTextStyle?: TextStyle;
  coloredTextStyle?: TextStyle;
  style?: ViewStyle;
  regularColor?: string;
}

interface IState {}
export default class ColorText extends Component<IProps, IState> {
  render() {
    let colorText = this.props.children?.toString() ?? '';
    const colorRegExp = new RegExp('\\[color:(.*?)](.*?)\\[\\/color]');

    let structuredText: {color?: string; value: string}[] = [];

    while (colorText.length) {
      const regExpMatch = colorText.match(colorRegExp);
      if (regExpMatch) {
        if (regExpMatch.index && regExpMatch.index > 0) {
          structuredText.push({
            color: undefined,
            value: colorText.substring(regExpMatch.index, -1),
          });
        }
        structuredText.push({
          color: regExpMatch[1],
          value: regExpMatch[2],
        });

        colorText = colorText.substring(
          (regExpMatch.index ?? 0) + regExpMatch[0].length,
        );
      } else {
        structuredText.push({
          color: undefined,
          value: colorText,
        });
        colorText = '';
      }
    }

    return (
      <View style={this.props.style}>
        <Text>
          {!!structuredText.length &&
            structuredText.map((data, index) => (
              <Text
                key={'colored' + index}
                style={[
                  {
                    color: !data.color
                      ? this.props.regularColor ?? 'black'
                      : data.color,
                  },
                  styles.regularText,
                  !data.color
                    ? this.props.regularTextStyle
                    : this.props.coloredTextStyle,
                ]}>
                {data.value}
              </Text>
            ))}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  regularText: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.21,
    opacity: 0.6,
  },
});
