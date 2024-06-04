import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx, width } from 'styles/pixel-ratio';

export const NewsButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TextWrapper = styled.View`
  padding: ${wPx(16)}px;
`;

export const Image = styled(FastImage)<{ aspectRatio: number }>`
  width: ${width}px;
  height: ${({ aspectRatio }) =>
    (aspectRatio > 0.5625 ? 0.5625 : aspectRatio) * width}px;
`;

export const Subtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: ${hPx(8)}px;
`;

export const PublishDate = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'small',
}))`
  color: ${({ theme }) => theme.colors.grey};
  margin-top: ${hPx(8)}px;
`;
