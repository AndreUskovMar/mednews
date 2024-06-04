import { TextStyle, TouchableOpacityProps } from 'react-native';

export type ButtonProps = {
  title: string;
  textStyle?: TextStyle;
} & Omit<TouchableOpacityProps, 'accessibilityRole'>;
