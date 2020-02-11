import React, {Component} from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  textStyle?: TextStyle;
  regularTextStyle?: TextStyle;
  coloredTextStyle?: TextStyle;
  boldTextStyle?: TextStyle;
  style?: ViewStyle;
  regularColor?: string;
}

interface IState {}

enum FormatTypes {
  BOLD,
}

export default class ColorText extends Component<IProps, IState> {
  getStructuredColor(colorText: string) {
    let structuredText: {
      color?: string;
      value: string;
    }[] = [];
    const colorRegExp = new RegExp('\\[color:(.*?)](.*?)\\[\\/color]');
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

    return structuredText;
  }

  getStructuredBold(
    structuredText: {
      formatting?: FormatTypes;
      color?: string;
      value: string;
    }[],
  ) {
    const loopText = structuredText.concat([]);
    const boldRegExp = new RegExp('\\[b](.*?)\\[\\/b]');
    loopText.forEach((text, index) => {
      const regExpMatch = text.value.match(boldRegExp);
      if (regExpMatch) {
        if (regExpMatch.index && regExpMatch.index > 0) {
          structuredText.splice(index, 1, {
            color: undefined,
            value: text.value.substring(regExpMatch.index, -1),
          });
        }
        structuredText.splice(index + 1, 0, {
          formatting: FormatTypes.BOLD,
          color: undefined,
          value: regExpMatch[1],
        });

        if (regExpMatch.index) {
          structuredText.splice(index + 2, 0, {
            color: undefined,
            value: text.value.substring(
              regExpMatch.index + regExpMatch[0].length,
            ),
          });
        }
      }
    });
  }

  render() {
    let colorText = this.props.children?.toString() ?? '';

    let structuredText: {
      formatting?: FormatTypes;
      color?: string;
      value: string;
    }[] = this.getStructuredColor(colorText);
    this.getStructuredBold(structuredText);

    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>
          {!!structuredText.length &&
            structuredText.map((data, index) => (
              <Text
                key={'colored' + index}
                style={[
                  {
                    color: !data.color
                      ? this.props.regularColor ?? 'black'
                      : data.color,
                    fontWeight:
                      data.formatting === FormatTypes.BOLD ? 'bold' : 'normal',
                  },
                  styles.regularText,
                  !data.color
                    ? this.props.regularTextStyle
                    : this.props.coloredTextStyle,
                  data.formatting === FormatTypes.BOLD
                    ? this.props.boldTextStyle
                    : undefined,
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
  },
});
