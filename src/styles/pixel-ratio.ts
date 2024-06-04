import { Dimensions, PixelRatio } from 'react-native';

export const { width, height } = Dimensions.get('screen');

const designHeight = 896;
const designWidth = 414;

const widthRatio = width / designWidth;
const heightRation = height / designHeight;

export const wPx = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * widthRatio);
};

export const hPx = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * heightRation);
};
