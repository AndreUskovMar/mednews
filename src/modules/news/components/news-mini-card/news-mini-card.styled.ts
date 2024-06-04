import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// components
import { Typography } from 'modules/core/components';

// styles
import { wPx } from 'styles/pixel-ratio';

export const Image = styled(FastImage)`
  width: ${wPx(160)}px;
  height: ${wPx(100)}px;
  margin-right: ${wPx(16)}px;
`;

export const HorizontalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const VerticalWrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: ${wPx(100)}px;
  justify-content: center;
`;

export const Text = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'small',
  numberOfLines: 1,
}))`
  width: ${wPx(90)}px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
  numberOfLines: 4,
}))`
  width: ${wPx(180)}px;
  margin-right: ${wPx(10)}px;
`;
