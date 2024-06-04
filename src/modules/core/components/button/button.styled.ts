import styled, { css } from 'styled-components/native';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const StyledButton = styled.TouchableOpacity`
  padding: ${hPx(16)}px ${wPx(32)}px;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.disabled};
    `}
`;

export const ButtonTitle = styled.Text`
  font-family: 'Mulish-Bold';
  color: ${({ theme }) => theme.colors.white};
  font-size: ${hPx(16)}px;
  text-transform: uppercase;
`;
