import { IconName } from 'modules/core/components/icon/icon.interface';
import { IconButtonStyleProps } from './icon-button.styled';

export type IconButtonProps = IconButtonStyleProps & {
  iconName: IconName;
  onPress: () => void;
};
