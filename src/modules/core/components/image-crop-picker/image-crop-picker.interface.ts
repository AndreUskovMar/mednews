import { Image } from 'react-native-image-crop-picker';

export type ImageCropPickerProps = {
  image: string | null;
  onChange: (image: Image) => void;
};
