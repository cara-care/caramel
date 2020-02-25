import React, {Component} from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  textStyle?: TextStyle;
  regularTextStyle?: TextStyle;
  coloredTextStyle?: TextStyle;
  boldTextStyle?: TextStyle;
  italicTextStyle?: TextStyle;
  underlineTextStyle?: TextStyle;
  linkTextStyle?: TextStyle;
  style?: ViewStyle;
  regularColor?: string;
  linkEvents: [() => void];
}

interface IState {}

enum FormatType {
  BOLD,
  ITALIC,
  UNDERLINE,
}

interface Structured {
  pressEvent?: () => void;
  formatting?: FormatType;
  color?: string;
  value: string;
}

export default class ColorText extends Component<IProps, IState> {
  getFormatted(
    loopText: Structured[],
    structuredText: Structured[],
    regExp: RegExp,
    formatType?: FormatType,
    pressEvent?: [() => void | undefined],
  ) {
    console.log('begin', JSON.stringify(structuredText));
    let eventIndex = 0;
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
              value: regExpMatch.input?.substring(regExpMatch.index, -1) ?? '',
            });
          }
          partedText.push({
            formatting: formatType,
            pressEvent: !!pressEvent && pressEvent.length > eventIndex ? pressEvent[eventIndex] : undefined,
            color: undefined,
            value: regExpMatch[1],
          });
          eventIndex++;

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

  loopForRegExp(text: string, array: Structured[], regExp: RegExp) {
    while (text.length) {
      const regExpMatch = text.match(regExp);

      if (regExpMatch) {
        if (regExpMatch.index && regExpMatch.index > 0) {
          array.push({
            color: undefined,
            value: text.substring(regExpMatch.index, -1),
          });
        }
        array.push({
          color: regExpMatch[1],
          value: regExpMatch[2],
        });

        text = text.substring(
          (regExpMatch.index || 0) + regExpMatch[0].length,
        );
      } else {
        array.push({value: text});
        text = '';
      }
    }
  }

  /**
   * Can be used in the future for getting data like color from new properties.
   */

  // getFormattedWithData(
  //   loopText: Structured[],
  //   structuredText: Structured[],
  //   regExp: RegExp,
  // ) {
  //   let extraIndex = 0;
  //   loopText.forEach((text, index) => {
  //     let partedText: Structured[] = [];

  //     this.loopForRegExp(text.value, partedText, regExp);

  //     structuredText.splice(index + extraIndex, 1, ...partedText);
  //     extraIndex += partedText.length - 1;
  //   });
  // }

  getStructuredColor(colorText: string) {
    let structuredText: {
      color?: string;
      value: string;
    }[] = [];
    const colorRegExp = new RegExp('\\[color:(.*?)](.*?)\\[\\/color]');
    this.loopForRegExp(colorText, structuredText, colorRegExp);
    return structuredText;
  }

  getStructuredBold(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const boldRegExp = new RegExp('\\[b](.*?)\\[\\/b]');
    this.getFormatted(loopText, structuredText, boldRegExp, FormatType.BOLD);
  }

  getStructuredItalic(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const italicRegExp = new RegExp('\\[i](.*?)\\[\\/i]');
    this.getFormatted(
      loopText,
      structuredText,
      italicRegExp,
      FormatType.ITALIC,
    );
  }

  getStructuredUnderline(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const underlineRegExp = new RegExp('\\[u](.*?)\\[\\/u]');
    this.getFormatted(
      loopText,
      structuredText,
      underlineRegExp,
      FormatType.UNDERLINE,
    );
  }

  getStructuredLink(structuredText: Structured[]) {
    const loopText = structuredText.concat([]);
    const colorRegExp = new RegExp('\\[link](.*?)\\[\\/link]');
    this.getFormatted(loopText, structuredText, colorRegExp, undefined, this.props.linkEvents);
    return structuredText;
  }

  render() {
    let colorText = this.props.children ? this.props.children.toString() : '';

    let structuredText: Structured[] = this.getStructuredColor(colorText);
    // this.getStructuredBold(structuredText);
    // this.getStructuredItalic(structuredText);
    // this.getStructuredUnderline(structuredText);
    this.getStructuredLink(structuredText);

    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>
          {!!structuredText.length &&
            structuredText.map((data, index) => (
              <Text
                key={'colored' + index}
                onPress={data.pressEvent}
                style={[
                  {
                    color: !data.color
                      ? this.props.regularColor || 'black'
                      : data.color,
                    fontWeight:
                      data.formatting === FormatType.BOLD ? 'bold' : 'normal',
                    fontStyle:
                      data.formatting === FormatType.ITALIC
                        ? 'italic'
                        : 'normal',
                    textDecorationLine:
                      data.formatting === FormatType.UNDERLINE
                        ? 'underline'
                        : 'none',
                  },
                  styles.regularText,
                  !data.color
                    ? this.props.regularTextStyle
                    : this.props.coloredTextStyle,
                  data.formatting === FormatType.BOLD
                    ? this.props.boldTextStyle
                    : undefined,
                  data.formatting === FormatType.ITALIC
                    ? this.props.italicTextStyle
                    : undefined,
                  data.formatting === FormatType.UNDERLINE
                    ? this.props.underlineTextStyle
                    : undefined,
                    !!data.pressEvent ? this.props.linkTextStyle : undefined,
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
