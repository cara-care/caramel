"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Theme_1 = require("../utils/Theme");
var __1 = require("../");
var RNSlider = require('react-native-slider');
var ShowHide;
(function (ShowHide) {
    ShowHide["SHOW"] = "flex";
    ShowHide["HIDE"] = "none";
})(ShowHide || (ShowHide = {}));
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showTooltip: ShowHide.HIDE,
            value: _this.props.existingValue
                ? _this.props.existingValue - _this.props.minimum
                : 0,
            componentWidth: 0,
            textWidth: 0,
        };
        return _this;
    }
    Slider.prototype.render = function () {
        var _this = this;
        var _a = this.props, minimum = _a.minimum, maximum = _a.maximum, thumbWidth = _a.thumbWidth, leftText = _a.leftText, rightText = _a.rightText, showTooltipOnSlide = _a.showTooltipOnSlide, leftTextStyle = _a.leftTextStyle, rightTextStyle = _a.rightTextStyle;
        var division = maximum - minimum;
        var textLeftCalculation = thumbWidth
            ? ((this.state.componentWidth - thumbWidth) / division) *
                this.state.value +
                thumbWidth / 2 -
                this.state.textWidth / 2
            : 0;
        var leftTopText = leftText ? (react_1.default.createElement(__1.Text, { type: "normal", style: [styles.topTexts, leftTextStyle] }, leftText)) : (react_1.default.createElement(react_native_1.View, null));
        var rightTopText = rightText ? (react_1.default.createElement(__1.Text, { type: "normal", style: [styles.topTexts, rightTextStyle] }, rightText)) : (react_1.default.createElement(react_native_1.View, null));
        var _b = this.props, thumbStyle = _b.thumbStyle, trackStyle = _b.trackStyle, thumbTextStyle = _b.thumbTextStyle, tooltipStyle = _b.tooltipStyle, onValueChange = _b.onValueChange, step = _b.step;
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.View, { style: styles.topTextsContainer },
                leftTopText,
                rightTopText),
            react_1.default.createElement(react_native_1.View, { onLayout: function (event) {
                    var width = event.nativeEvent.layout.width;
                    _this.setState({ componentWidth: width });
                } },
                react_1.default.createElement(RNSlider, { value: this.state.value, minimumValue: 0, maximumValue: maximum - minimum, minimumTrackTintColor: Theme_1.default.colors.primary, maximumTrackTintColor: 'rgb(224, 247, 247)', step: step, thumbStyle: [thumbStyle, { width: thumbWidth }], trackStyle: [trackStyle, styles.trackStyle], onValueChange: function (value) {
                        _this.setState({ value: value });
                        onValueChange(value + minimum);
                    }, onSlidingStart: function () {
                        _this.setState({ showTooltip: ShowHide.SHOW });
                    }, onSlidingComplete: function () {
                        _this.setState({ showTooltip: ShowHide.HIDE });
                    } }),
                react_1.default.createElement(react_native_1.View, { pointerEvents: 'none', onLayout: function (event) {
                        var width = event.nativeEvent.layout.width;
                        _this.setState({ textWidth: width });
                    }, style: [
                        styles.thumbTextContainer,
                        {
                            left: textLeftCalculation,
                        },
                    ] },
                    react_1.default.createElement(__1.Text, { type: "small", style: [thumbTextStyle, styles.thumbText] }, this.state.value + minimum),
                    showTooltipOnSlide && (react_1.default.createElement(react_native_1.View, { style: [styles.tooltip, { display: this.state.showTooltip }] },
                        react_1.default.createElement(__1.Text, { type: "header4", style: [tooltipStyle, styles.tooltipText] }, this.state.value + minimum)))))));
    };
    Slider.defaultProps = {
        step: 1,
        thumbWidth: 50,
        showTooltipOnSlide: true,
    };
    return Slider;
}(react_1.PureComponent));
exports.default = Slider;
var styles = react_native_1.StyleSheet.create({
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