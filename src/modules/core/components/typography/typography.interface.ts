import { TextProps } from 'react-native';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body'
  | 'small';

export type TypographyProps = TextProps & {
  variant: TypographyVariants;
};
