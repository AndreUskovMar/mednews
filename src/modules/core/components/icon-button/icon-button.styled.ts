import styled, { css } from 'styled-components/native';
import { hPx, wPx } from 'styles/pixel-ratio';

export type IconButtonStyleProps = {
  color?: string;
  size: 'small' | 'medium';
};

export const Root = styled.TouchableOpacity<IconButtonStyleProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  ${({ size }) =>
    size === 'small' &&
    css`
      width: ${wPx(40)}px;
      height: ${hPx(40)}px;
    `}

  ${({ size }) =>
    size === 'medium' &&
    css`
      width: ${wPx(80)}px;
      height: ${hPx(50)}px;
    `}

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;
