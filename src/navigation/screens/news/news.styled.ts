import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';

// styles
import { height, hPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const Separator = styled.View`
  height: ${hPx(20)}px;
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
