import React, {Component} from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  textStyle?: TextStyle;
  regularTextStyle?: TextStyle;
  coloredTextStyle?: TextStyle;
  boldTextStyle?: TextStyle;
  italicTextStyle?: TextStyle;
  underlineTextStyle?: TextStyle;
  style?: ViewStyle;
  regularColor?: string;
}

interface IState {}

enum FormatTypes {
  COLOR,
  BOLD,
  ITALIC,
  UNDERLINE,
}

interface Structured {
  formatting?: FormatTypes;
  color?: string;
  value: string;
}

export default class ColorText extends Component<IProps, IState> {
  loopForRegExp(colorText: string, array: Structured[]) {
    const colorRegExp = new RegExp('\\[color:(.*?)](.*?)\\[\\/color]');

    while (colorText.length) {
      const regExpMatch = colorText.match(colorRegExp);

      if (regExpMatch) {
        if (regExpMatch.index && regExpMatch.index > 0) {
          array.push({
            color: undefined,
            value: colorText.substring(regExpMatch.index, -1),
          });
        }
        array.push({
          color: regExpMatch[1],
          value: regExpMatch[2],
        });

        colorText = colorText.substring(
          (regExpMatch.index || 0) + regExpMatch[0].length,
        );
      } else {
        array.push({value: colorText});
        colorText = '';
      }
    }
  }

  getStructuredColor(colorText: string) {
    let structuredText: {
      color?: string;
      value: string;
    }[] = [];
    this.loopForRegExp(colorText, structuredText);
    return structuredText;
  }

  getFormatted(
    loopText: Structured[],
    structuredText: Structured[],
    formatType: FormatTypes,
    regExp: RegExp,
  ) {
    let extraIndex = 0;
    loopText.forEach((text, index) => {
      let partedText: Structured[] = [];
      let colorText = text.value;

      while (colorText.length) {
        const regExpMatch = colorText.match(regExp);
        if (regExpMatch) {
          if (regExpMatch.index !== undefined) {
            partedText.push({
              color: undefined,
              value: text.value.substring(regExpMatch.index, -1),
            });
          }
          partedText.push({
            formatting: formatType,
            color: undefined,
            value: regExpMatch[1],
          });

          colorText = colorText.substring(
            (regExpMatch.index || 0) + regExpMatch[0].length,
          );
        } else {
          text.value = colorText;
          partedText.push(text);
          colorText = '';
        }
      }

      structuredText.splice(index + extraIndex, 1, ...partedText);
      extraIndex += partedText.length - 1;
    });
  }

  getStructuredBold(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const boldRegExp = new RegExp('\\[b](.*?)\\[\\/b]');
    this.getFormatted(loopText, structuredText, FormatTypes.BOLD, boldRegExp);
  }

  getStructuredItalic(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const italicRegExp = new RegExp('\\[i](.*?)\\[\\/i]');
    this.getFormatted(
      loopText,
      structuredText,
      FormatTypes.ITALIC,
      italicRegExp,
    );
  }

  getStructuredUnderline(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const underlineRegExp = new RegExp('\\[u](.*?)\\[\\/u]');
    this.getFormatted(
      loopText,
      structuredText,
      FormatTypes.UNDERLINE,
      underlineRegExp,
    );
  }

  render() {
    let colorText = this.props.children ? this.props.children.toString() : '';

    let structuredText: Structured[] = this.getStructuredColor(colorText);
    this.getStructuredBold(structuredText);
    this.getStructuredItalic(structuredText);
    this.getStructuredUnderline(structuredText);

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
                      ? this.props.regularColor || 'black'
                      : data.color,
                    fontWeight:
                      data.formatting === FormatTypes.BOLD ? 'bold' : 'normal',
                    fontStyle:
                      data.formatting === FormatTypes.ITALIC
                        ? 'italic'
                        : 'normal',
                    textDecorationLine:
                      data.formatting === FormatTypes.UNDERLINE
                        ? 'underline'
                        : 'none',
                  },
                  styles.regularText,
                  !data.color
                    ? this.props.regularTextStyle
                    : this.props.coloredTextStyle,
                  data.formatting === FormatTypes.BOLD
                    ? this.props.boldTextStyle
                    : undefined,
                  data.formatting === FormatTypes.ITALIC
                    ? this.props.italicTextStyle
                    : undefined,
                  data.formatting === FormatTypes.UNDERLINE
                    ? this.props.underlineTextStyle
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
