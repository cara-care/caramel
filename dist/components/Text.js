import * as React from 'react';
import { Text as RNText } from 'react-native';
import theme from '../utils/Theme';
export default class Text extends React.Component {
    render() {
        const { type, style, numberOfLines, gutterBottom, ...rest } = this.props;
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
        return (React.createElement(RNText, Object.assign({ style: [defaultStyles, style] }, { numberOfLines }, rest)));
    }
}
Text.defaultProps = {
    type: 'normal',
};
