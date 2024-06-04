import { Options } from 'react-native-image-crop-picker';

export const options: Options = {
  mediaType: 'photo',
  cropping: true,
  freeStyleCropEnabled: true,
  avoidEmptySpaceAroundImage: true,
  compressImageQuality: 0.3,
  compressImageMaxWidth: 600,
  compressImageMaxHeight: 600,
  enableRotationGesture: true,
  includeBase64: true,
  multiple: false,
};
