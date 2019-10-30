import React, { Component } from 'react';
import { ViewStyle, RegisteredStyle } from 'react-native';
interface Props {
    children: React.ReactNode;
    bgColor?: string;
    style?: ViewStyle | RegisteredStyle<ViewStyle>;
    androidStatusBarMargin?: boolean;
    iosStatusBarColor?: string;
    iosBottomSafeArea?: boolean;
}
declare class Container extends Component<Props> {
    static defaultProps: {
        bgColor: string;
    };
    render(): JSX.Element;
}
export default Container;
