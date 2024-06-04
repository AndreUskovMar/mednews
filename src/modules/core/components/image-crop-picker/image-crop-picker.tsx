import React, { useCallback, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

// components
import { CropImage } from './image-crop-picker.styles';

// constants
import { options } from 'modules/core/constants/image-crop-options';

import { dlog } from 'redux/store';
import CropImageSource from 'assets/images/crop-image.png';
import { ImageCropPickerProps } from './image-crop-picker.interface';

export const ImageCropPicker = memo<ImageCropPickerProps>(
  ({ image, onChange }) => {
    const openPicker = useCallback(() => {
      ImagePicker.openPicker(options)
        .then((response: Image) => onChange(response))
        .catch(dlog);
    }, [onChange]);

    return (
      <TouchableOpacity onPress={openPicker}>
        <CropImage source={image?.length ? { uri: image } : CropImageSource} />
      </TouchableOpacity>
    );
  }
);
