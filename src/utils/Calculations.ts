import {Dimensions, Platform, StatusBar} from 'react-native';

const {height} = Dimensions.get('window');
// https://en.wikipedia.org/wiki/Golden_ratio
const φ = (1 + Math.sqrt(5)) / 2;
export const MIN_HEADER_HEIGHT = Platform.select({
  ios: 20,
  android: StatusBar.currentHeight,
});
export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);
export const HEADER_DELTA = MAX_HEADER_HEIGHT - (MIN_HEADER_HEIGHT || 0);
