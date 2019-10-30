"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Theme_1 = __importDefault(require("../utils/Theme"));
class Text extends React.Component {
    render() {
        const _a = this.props, { type, style, numberOfLines, gutterBottom } = _a, rest = __rest(_a, ["type", "style", "numberOfLines", "gutterBottom"]);
        const isHeader = type.startsWith('header');
        const defaultStyles = [
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
        return (<react_native_1.Text style={[defaultStyles, style]} {...{ numberOfLines }} {...rest}/>);
    }
}
exports.default = Text;
Text.defaultProps = {
    type: 'normal',
};
//# sourceMappingURL=Text.js.map