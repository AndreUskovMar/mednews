import styled from 'styled-components/native';
import { Image } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

import OrangeSalamanderImageSource from 'assets/images/orange-salamander.png';

export const Root = styled.View`
  padding: ${hPx(88)}px ${wPx(16)}px ${hPx(16)}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const OrangeSalamanderImage = styled(Image).attrs((props) => ({
  ...props,
  source: OrangeSalamanderImageSource,
}))`
  margin: ${hPx(16)}px auto ${hPx(32)}px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))`
  margin: 0 0 ${hPx(32)}px;
`;
