import { PureComponent } from 'react';
import { StyleProp } from 'react-native';
interface IProps {
    thumbStyle?: StyleProp<any>;
    thumbTextStyle?: StyleProp<any>;
    trackStyle?: StyleProp<any>;
    tooltipStyle?: StyleProp<any>;
    leftTextStyle?: StyleProp<any>;
    rightTextStyle?: StyleProp<any>;
    minimum: number;
    maximum: number;
    onValueChange: (value: number) => void;
    thumbWidth?: number;
    existingValue?: number;
    leftText?: string;
    rightText?: string;
    showTooltipOnSlide?: boolean;
    step?: number;
}
declare enum ShowHide {
    SHOW = "flex",
    HIDE = "none"
}
interface IState {
    value: number;
    componentWidth: number;
    textWidth: number;
    showTooltip: ShowHide;
}
export default class Slider extends PureComponent<IProps, IState> {
    static defaultProps: {
        step: number;
        thumbWidth: number;
        showTooltipOnSlide: boolean;
    };
    state: {
        showTooltip: ShowHide;
        value: number;
        componentWidth: number;
        textWidth: number;
    };
    render(): JSX.Element;
}
export {};
