import React from 'react';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import theme from '../utils/Theme';

interface Props {
  type: 'header1' | 'header2' | 'header3' | 'header4' | 'normal' | 'small';
  numberOfLines?: number;
  gutterBottom?: boolean;
  children: React.ReactText | React.ReactText[];
  style?: StyleProp<TextStyle>;
}

export default class Text extends React.Component<Props> {
  static defaultProps = {
    type: 'normal',
  };

  render() {
    const {type, style, numberOfLines, gutterBottom, ...rest} = this.props;
    const isHeader = type.startsWith('header');
    const defaultStyles = [
      theme.typography[type],
      {
        color: isHeader ? theme.colors.dusk : theme.typography.color,
        marginBottom: gutterBottom
          ? isHeader
            ? theme.spacing.md
            : theme.spacing.sm
          : 0,
      },
    ];

    return (
      <RNText style={[defaultStyles, style]} {...{numberOfLines}} {...rest} />
    );
  }
}
