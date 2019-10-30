var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Text as RNText } from 'react-native';
import theme from '../utils/Theme';
export default class Text extends React.Component {
    render() {
        const _a = this.props, { type, style, numberOfLines, gutterBottom } = _a, rest = __rest(_a, ["type", "style", "numberOfLines", "gutterBottom"]);
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
//# sourceMappingURL=Text.js.map