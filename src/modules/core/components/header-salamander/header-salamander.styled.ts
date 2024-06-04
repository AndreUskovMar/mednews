import styled from 'styled-components/native';
import { Image } from 'react-native';

// components
import { Typography } from 'modules/core/components/typography';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

import SalamanderImageSource from 'assets/images/transparent-salamander.png';

export const Root = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.orange};
`;

export const OrangeSalamanderImage = styled(Image).attrs((props) => ({
  ...props,
  source: SalamanderImageSource,
}))`
  width: ${hPx(40)}px;
  height: ${hPx(40)}px;
  margin-left: ${wPx(28)}px;
  margin-right: ${wPx(8)}px;
  margin-bottom: ${hPx(10)}px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Mulish-Bold';
`;
