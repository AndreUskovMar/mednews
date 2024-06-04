import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx } from 'styles/pixel-ratio';

export const ContactButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.lightgray};
  height: ${hPx(60)}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: ${hPx(8)}px;
  padding-bottom: ${hPx(8)}px;
`;

export const ContactBrand = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
`;

export const ContactName = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.tabBlack};
`;
