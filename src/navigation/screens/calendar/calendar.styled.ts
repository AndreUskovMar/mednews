import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const EventsQuantity = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  font-size: ${hPx(14)}px;
  color: rgba(51, 51, 51, 0.8);
  margin: ${hPx(32)}px ${hPx(24)}px ${wPx(16)}px;
`;

export const EmptyResultMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  color: ${({ theme }) => theme.colors.orange};
`;

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginBottom: hPx(Platform.OS === 'ios' && height > 700 ? 90 : 80),
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
