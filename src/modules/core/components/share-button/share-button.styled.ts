import styled from 'styled-components/native';

// styles
import { hPx } from 'styles/pixel-ratio';

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${hPx(16)}px;
  padding-right: ${hPx(16)}px;
  height: ${hPx(70)}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 1px;
  border-color: rgba(120, 126, 135, 0.25);
  border-radius: ${hPx(8)}px;
  margin-bottom: ${hPx(16)}px;
`;
