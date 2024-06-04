import styled from 'styled-components/native';
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  margin-top: ${hPx(32)}px;
`;

export const Input = styled.TextInput`
  height: ${hPx(50)}px;
  background-color: rgba(237, 237, 237, 0.5);
  color: ${({ theme }) => theme.colors.black};
  margin-top: ${hPx(4)}px;
  border-radius: ${hPx(8)}px;
  border-width: 1px;
  border-color: rgba(51, 51, 51, 0.15);
  padding-left: ${wPx(10)}px;
  padding-right: ${wPx(10)}px;
  font-size: ${hPx(16)}px;
  font-family: 'Mulish-Regular';
`;
