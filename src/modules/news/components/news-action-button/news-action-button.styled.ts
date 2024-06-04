import styled from 'styled-components/native';
import { Typography } from 'modules/core/components';
import { hPx } from 'styles/pixel-ratio';

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

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${hPx(18)}px;
`;
