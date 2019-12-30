import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../utils/Theme';
import { Text } from '../';
import RNSlider from 'react-native-slider';
export default class Slider extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            showTooltip: false,
            value: this.props.value || (this.props.existingValue
                ? this.props.existingValue - this.props.minimum
                : 0),
            componentWidth: 0,
            textWidth: 0,
        };
    }
    render() {
        const { minimum, maximum, thumbWidth, leftText, rightText, showTooltipOnSlide, leftTextStyle, rightTextStyle, } = this.props;
        const division = maximum - minimum;
        const textLeftCalculation = thumbWidth
            ? ((this.state.componentWidth - thumbWidth) / division) *
                this.state.value +
                thumbWidth / 2 -
                this.state.textWidth / 2
            : 0;
        const leftTopText = leftText ? (React.createElement(Text, { type: "normal", style: [styles.topTexts, leftTextStyle] }, leftText)) : (React.createElement(View, null));
        const rightTopText = rightText ? (React.createElement(Text, { type: "normal", style: [styles.topTexts, rightTextStyle] }, rightText)) : (React.createElement(View, null));
        const { thumbStyle, trackStyle, thumbTextStyle, tooltipStyle, onValueChange, step, tintColor, } = this.props;
        return (React.createElement(View, null,
            React.createElement(View, { style: styles.topTextsContainer },
                leftTopText,
                rightTopText),
            React.createElement(View, { onLayout: event => {
                    let { width } = event.nativeEvent.layout;
                    this.setState({ componentWidth: width });
                } },
                React.createElement(RNSlider, { value: this.props.value || this.state.value, minimumValue: 0, maximumValue: maximum - minimum, minimumTrackTintColor: tintColor ? tintColor : theme.colors.primary, maximumTrackTintColor: 'rgb(224, 247, 247)', step: step, thumbStyle: [thumbStyle, { width: thumbWidth }], trackStyle: [styles.trackStyle, trackStyle], onValueChange: (value) => {
                        this.setState({ value: value });
                        onValueChange(value + minimum);
                    }, onSlidingStart: () => {
                        this.setState({ showTooltip: true });
                    }, onSlidingComplete: () => {
                        this.setState({ showTooltip: false });
                    } }),
                React.createElement(View, { pointerEvents: 'none', onLayout: event => {
                        let { width } = event.nativeEvent.layout;
                        this.setState({ textWidth: width });
                    }, style: [
                        styles.thumbTextContainer,
                        {
                            left: textLeftCalculation,
                        },
                    ] },
                    React.createElement(Text, { type: "small", style: [thumbTextStyle, styles.thumbText] }, this.state.value + minimum),
                    showTooltipOnSlide && this.state.showTooltip && (React.createElement(View, { style: styles.tooltip },
                        React.createElement(Text, { type: "header4", style: [tooltipStyle, styles.tooltipText] }, this.state.value + minimum)))))));
    }
}
Slider.defaultProps = {
    step: 1,
    thumbWidth: 50,
    showTooltipOnSlide: true,
};
const styles = StyleSheet.create({
    tooltipText: {
        color: 'white',
    },
    tooltip: {
        height: 49,
        width: 49,
        backgroundColor: theme.colors.dusk,
        position: 'absolute',
        top: -75,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topTextsContainer: {
        marginBottom: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topTexts: {
        opacity: 0.8,
    },
    thumbTextContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 10,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    trackStyle: {
        borderRadius: 5,
        height: 10,
    },
    thumbText: {
        color: theme.colors.dusk,
    },
});
