import { IconName } from 'modules/core/components/icon/icon.interface';

export type ShareActionButtonProps = {
  iconName: IconName;
  title: string;
  onPress: () => void;
};
