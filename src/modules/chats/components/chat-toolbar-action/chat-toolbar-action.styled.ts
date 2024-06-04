import styled from 'styled-components/native';

// styles
import { wPx } from 'styles/pixel-ratio';

export const ChatToolbarActionWrapper = styled.View`
  width: ${wPx(40)}px;
  height: 100%;
  margin-left: ${wPx(16)}px;
  margin-right: ${wPx(10)}px;
`;

export const ChatContactPhoto = styled.Image`
  width: ${wPx(40)}px;
  height: ${wPx(40)}px;
  border-radius: ${wPx(20)}px;
`;

export const ChatIconWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 0;
  top: ${wPx(20)}px;
  padding: 2px;
  border-radius: 4px;
`;
