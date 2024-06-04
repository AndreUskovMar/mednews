import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.ScrollView`
  padding: ${wPx(16)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))``;

export const Content = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  margin: ${hPx(32)}px 0;
`;
