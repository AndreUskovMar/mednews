import styled, { css } from 'styled-components/native';

// styles
import { wPx } from 'styles/pixel-ratio';

export const CountryButton = styled.TouchableOpacity`
  padding: ${wPx(16)}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.disabled};
    `}
`;

export const Image = styled.Image`
  height: ${wPx(48)}px;
  width: ${wPx(48)}px;
  margin-right: ${wPx(10)}px;
`;
