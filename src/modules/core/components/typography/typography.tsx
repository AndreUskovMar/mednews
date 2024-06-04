import styled, { css } from 'styled-components/native';

import type { TypographyProps } from './typography.interface';

// styles
import { hPx } from 'styles/pixel-ratio';

export const Typography = styled.Text.attrs((props) => ({
  ...props,
  allowFontScaling: false,
}))<TypographyProps>`
  font-style: normal;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Mulish-SemiBold';
  ${({ variant }) =>
    variant === 'h1' &&
    css`
      font-size: ${hPx(32)}px;
      font-family: 'Mulish-Bold';
    `}
  ${({ variant }) =>
    variant === 'h2' &&
    css`
      font-size: ${hPx(24)}px;
    `}
  ${({ variant }) =>
    variant === 'h3' &&
    css`
      font-size: ${hPx(20)}px;
    `}
  ${({ variant }) =>
    variant === 'h4' &&
    css`
      font-size: ${hPx(16)}px;
    `}
  ${({ variant }) =>
    variant === 'h5' &&
    css`
      font-size: ${hPx(14)}px;
    `}
  ${({ variant }) =>
    variant === 'body' &&
    css`
      font-size: ${hPx(16)}px;
      font-family: 'Mulish-Regular';
    `}
  ${({ variant }) =>
    variant === 'small' &&
    css`
      font-size: ${hPx(12)}px;
      font-family: 'Mulish-Regular';
    `}
`;
