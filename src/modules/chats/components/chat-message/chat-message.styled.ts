import styled from 'styled-components/native';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const ChatMessageContainer = styled.View`
  margin: ${hPx(8)}px ${wPx(16)}px;
`;

export const ChatUserInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ChatMessageWrapper = styled.View`
  padding: ${wPx(8)}px ${wPx(8)}px ${wPx(30)}px ${wPx(30)}px;
  margin-top: ${wPx(8)}px;
  margin-left: ${wPx(19)}px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.colors.tabGrey};
`;

export const ChatUserNameWrapper = styled.View`
  margin-left: ${wPx(13)}px;
`;
