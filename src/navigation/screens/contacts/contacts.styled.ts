import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const Separator = styled.View`
  height: ${hPx(1)}px;
  background-color: ${({ theme }) => theme.colors.whitesmoke};
  margin-bottom: ${hPx(8)}px;
`;

export const EmptyResultMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  align-self: center;
`;

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: hPx(32),
    marginBottom: hPx(Platform.OS === 'ios' && height > 700 ? 80 : 60),
  },
  listPadding: {
    paddingHorizontal: wPx(16),
    marginTop: 0,
  },
  indicator: {
    marginTop: '50%',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
