import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, width, hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const Separator = styled.View`
  height: ${hPx(1)}px;
  background-color: ${({ theme }) => theme.colors.whitesmoke};
  width: ${width - wPx(114)}px;
  align-self: flex-end;
`;

export const EmptyResultMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  color: ${({ theme }) => theme.colors.orange};
`;

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    marginTop: hPx(20),
    marginBottom: hPx(Platform.OS === 'ios' && height > 700 ? 80 : 60),
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
