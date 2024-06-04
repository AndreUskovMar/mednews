import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconProps } from 'modules/core/components/icon/icon.interface';

export type TabBarProps = {
  isVisible: boolean;
} & BottomTabBarProps;

export type ITab = {
  title: string;
  iconProps: IconProps;
};

export type TabProps = Record<string, ITab>;
