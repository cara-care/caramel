"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const Theme_1 = require("../utils/Theme");
const __1 = require("../");
const react_native_slider_1 = require("react-native-slider");
class Slider extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            showTooltip: false,
            value: this.props.existingValue
                ? this.props.existingValue - this.props.minimum
                : 0,
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
        const leftTopText = leftText ? (react_1.default.createElement(__1.Text, { type: "normal", style: [styles.topTexts, leftTextStyle] }, leftText)) : (react_1.default.createElement(react_native_1.View, null));
        const rightTopText = rightText ? (react_1.default.createElement(__1.Text, { type: "normal", style: [styles.topTexts, rightTextStyle] }, rightText)) : (react_1.default.createElement(react_native_1.View, null));
        const { thumbStyle, trackStyle, thumbTextStyle, tooltipStyle, onValueChange, step, } = this.props;
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.View, { style: styles.topTextsContainer },
                leftTopText,
                rightTopText),
            react_1.default.createElement(react_native_1.View, { onLayout: event => {
                    let { width } = event.nativeEvent.layout;
                    this.setState({ componentWidth: width });
                } },
                react_1.default.createElement(react_native_slider_1.default, { value: this.state.value, minimumValue: 0, maximumValue: maximum - minimum, minimumTrackTintColor: Theme_1.default.colors.primary, maximumTrackTintColor: 'rgb(224, 247, 247)', step: step, thumbStyle: [thumbStyle, { width: thumbWidth }], trackStyle: [trackStyle, styles.trackStyle], onValueChange: (value) => {
                        this.setState({ value: value });
                        onValueChange(value + minimum);
                    }, onSlidingStart: () => {
                        this.setState({ showTooltip: true });
                    }, onSlidingComplete: () => {
                        this.setState({ showTooltip: false });
                    } }),
                react_1.default.createElement(react_native_1.View, { pointerEvents: 'none', onLayout: event => {
                        let { width } = event.nativeEvent.layout;
                        this.setState({ textWidth: width });
                    }, style: [
                        styles.thumbTextContainer,
                        {
                            left: textLeftCalculation,
                        },
                    ] },
                    react_1.default.createElement(__1.Text, { type: "small", style: [thumbTextStyle, styles.thumbText] }, this.state.value + minimum),
                    showTooltipOnSlide && this.state.showTooltip && (react_1.default.createElement(react_native_1.View, { style: styles.tooltip },
                        react_1.default.createElement(__1.Text, { type: "header4", style: [tooltipStyle, styles.tooltipText] }, this.state.value + minimum)))))));
    }
}
exports.default = Slider;
Slider.defaultProps = {
    step: 1,
    thumbWidth: 50,
    showTooltipOnSlide: true,
};
const styles = react_native_1.StyleSheet.create({
    tooltipText: {
        color: 'white',
    },
    tooltip: {
        height: 49,
        width: 49,
        backgroundColor: Theme_1.default.colors.dusk,
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
        color: Theme_1.default.colors.dusk,
    },
});
//# sourceMappingURL=Slider.js.map