"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mediumGrey = '#AEAEAE';
const kaleGreen = '#1E8080';
const aquaMarine = '#50E3C2';
const sunFlowerYellow = '#FFD13E';
const carrotRed = '#FA5544';
const raspberryRed = '#DD206A';
const theme = {
    colors: {
        primary: '#00B4A7',
        primaryDisabled: 'rgba(0,180,167,0.1)',
        dusk: '#535D7E',
        dusk2: '#505b7d',
        emptyStatePurple: '#B87DFF',
        palePurple: '#a4a4bd',
        ice: '#F2F7F3',
        paleLilac: '#DADAED',
        blue: '#221E92',
        malibu: '#80a6fd',
        ultraLightGrey: 'rgba(247, 247,  247, 1)',
        lightGrey: '#dddddd',
        mediumGrey,
        darkGrey: '#595959',
        grey: '#898989',
        greyBg: '#F4F7F8',
        skeleton: '#e3e3e3',
        kaleGreen,
        aquaMarine,
        sunFlowerYellow,
        carrotRed,
        raspberryRed,
        trafficLightColorScale: [
            kaleGreen,
            aquaMarine,
            sunFlowerYellow,
            carrotRed,
            raspberryRed,
        ],
        trafficLightColorScaleStool: [
            mediumGrey,
            raspberryRed,
            raspberryRed,
            sunFlowerYellow,
            kaleGreen,
            kaleGreen,
            sunFlowerYellow,
            raspberryRed,
            raspberryRed,
        ],
    },
    typography: {
        color: '#a9aebe',
        header1: {
            fontSize: 32,
            lineHeight: 46,
        },
        header2: {
            fontSize: 26,
            lineHeight: 40,
        },
        header3: {
            fontSize: 21,
            lineHeight: 34.56,
        },
        header4: {
            fontSize: 20,
            lineHeight: 32,
        },
        normal: {
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: -0.28,
        },
        small: {
            fontSize: 14,
            lineHeight: 20,
        },
    },
    spacing: {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 48,
        xl: 64,
    },
};
exports.default = theme;
//# sourceMappingURL=Theme.js.map