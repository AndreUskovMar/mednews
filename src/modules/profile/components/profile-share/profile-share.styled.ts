import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// utils
import { hPx, wPx } from 'styles/pixel-ratio';

export const ProfileShareWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${hPx(19)}px ${wPx(16)}px;
  background-color: ${({ theme }) => theme.colors.orange};
`;

export const ProfileShareText = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  color: ${({ theme }) => theme.colors.white};
`;
