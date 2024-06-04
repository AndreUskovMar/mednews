import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx, height, width } from 'styles/pixel-ratio';

export const Root = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))`
  margin-top: ${hPx(16)}px;
  color: ${({ theme }) => theme.colors.orange};
`;

export const Subtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  color: rgba(51, 51, 51, 0.5);
  margin-top: ${hPx(16)}px;
`;

export const CreationDate = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.grey};
  margin-top: ${hPx(16)}px;
`;

export const ImageWrapper = styled.View`
  margin: ${hPx(32)}px ${wPx(16)}px ${hPx(48)}px;
`;

export const Image = styled(FastImage)<{ aspectRatio: number }>`
  width: ${width}px;
  height: ${({ aspectRatio }) => aspectRatio * width}px;
  margin-top: ${hPx(16)}px;
  margin-bottom: ${hPx(16)}px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${hPx(16)}px;
  padding-right: ${hPx(16)}px;
  height: ${hPx(70)}px;
  background-color: ${({ theme }) => theme.colors.disabled};
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 126, 135, 0.24);
`;

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.colors.disabled};
  height: ${hPx(Platform.OS === 'ios' && height > 700 ? 20 : 0)}px;
`;

export const EmptyResultMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  color: ${({ theme }) => theme.colors.orange};
`;

export const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
