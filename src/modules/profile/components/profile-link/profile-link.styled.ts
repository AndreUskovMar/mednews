import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// utils
import { hPx } from 'styles/pixel-ratio';

export const ProfileLinkWrapper = styled.TouchableOpacity`
  display: flex;
  padding-vertical: ${hPx(8)}px;
  padding-right: 4px;
`;

export const ProfileLinkTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const ProfileLinkSubtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Mulish-Medium';
`;
