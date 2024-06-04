import { hPx, wPx } from 'styles/pixel-ratio';
import styled from 'styled-components/native';

export const Root = styled.View`
  width: ${wPx(370)}px;
  max-height: ${hPx(70)}px;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: ${wPx(8)}px;
  overflow: hidden;
`;

export const IconWrapper = styled.View`
  background-color: #ff7a11;
  width: ${wPx(80)}px;
  justify-content: center;
  align-items: center;
`;

export const MessageWrapper = styled.View`
  margin-left: ${wPx(16)}px;
  padding: ${wPx(8)}px;
`;

export const Title = styled.Text`
  font-size: ${hPx(14)}px;
  font-family: 'Mulish-Bold';
`;

export const Message = styled.Text`
  font-size: ${hPx(14)}px;
  font-family: 'Mulish-Regular';
  color: #4a5568;
`;
