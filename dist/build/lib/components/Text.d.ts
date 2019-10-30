import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';
interface Props {
    type: 'header1' | 'header2' | 'header3' | 'header4' | 'normal' | 'small';
    numberOfLines?: number;
    gutterBottom?: boolean;
    children: React.ReactText | React.ReactText[];
    style?: StyleProp<TextStyle>;
}
export default class Text extends React.Component<Props> {
    static defaultProps: {
        type: string;
    };
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Text.d.ts.map