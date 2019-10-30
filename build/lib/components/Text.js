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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Theme_1 = require("../utils/Theme");
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        var _a = this.props, type = _a.type, style = _a.style, numberOfLines = _a.numberOfLines, gutterBottom = _a.gutterBottom, rest = __rest(_a, ["type", "style", "numberOfLines", "gutterBottom"]);
        var isHeader = type.startsWith('header');
        var defaultStyles = [
            Theme_1.default.typography[type],
            {
                color: isHeader ? Theme_1.default.colors.dusk : Theme_1.default.typography.color,
                marginBottom: gutterBottom
                    ? isHeader
                        ? Theme_1.default.spacing.md
                        : Theme_1.default.spacing.sm
                    : 0,
            },
        ];
        return (react_1.default.createElement(react_native_1.Text, __assign({ style: [defaultStyles, style] }, { numberOfLines: numberOfLines }, rest)));
    };
    Text.defaultProps = {
        type: 'normal',
    };
    return Text;
}(react_1.default.Component));
exports.default = Text;
//# sourceMappingURL=Text.js.map