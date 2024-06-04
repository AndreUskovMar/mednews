import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const ChatButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.lightgray};
  height: ${hPx(100)}px;
  display: flex;
  flex-direction: row;
  padding-top: ${hPx(20)}px;
  padding-bottom: ${hPx(20)}px;
`;

export const ChatContactInfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ChatContactPhoto = styled(FastImage)`
  width: ${hPx(70)}px;
  height: ${hPx(70)}px;
  border-radius: ${hPx(35)}px;
  margin-top: 2px;
  margin-right: ${hPx(15)}px;
`;

export const ChatContactBrand = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
`;

export const ChatContactName = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  color: ${({ theme }) => theme.colors.tabBlack};
  margin-vertical: ${hPx(4)}px;
`;

export const ChatLastMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
  numberOfLines: 1,
}))`
  color: ${({ theme }) => theme.colors.grey};
  width: ${wPx(250)}px;
`;

export const ChatIconWrapper = styled.View`
  height: ${hPx(100)}px;
  position: absolute;
  right: 5px;
  display: flex;
  justify-content: center;
`;
