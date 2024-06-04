import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// utils
import { hPx, wPx, width } from 'styles/pixel-ratio';

export const ProfileFieldWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${hPx(8)}px;
  padding-right: 4px;
`;

export const ProfileFieldTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const ProfileFieldValue = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Mulish-Medium';
  width: ${width - wPx(70)}px;
`;
