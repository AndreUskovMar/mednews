import styled, { css } from 'styled-components/native';

// styles
import { wPx } from 'styles/pixel-ratio';

import { FooterInterface } from './footer.interface';

export const Footer = styled.View<FooterInterface>`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  padding: ${wPx(20)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ variant }) =>
    variant === 'center' &&
    css`
      align-items: center;
    `}
  ${({ variant }) =>
    variant === 'left' &&
    css`
      align-items: flex-start;
    `}
    ${({ variant }) =>
    variant === 'right' &&
    css`
      align-items: flex-end;
    `}
`;
