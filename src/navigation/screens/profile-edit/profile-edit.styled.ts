import styled from 'styled-components/native';
import { Platform, StatusBar, StyleSheet } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// utils
import { height, hPx, wPx } from 'styles/pixel-ratio';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Root = styled.View`
  padding: ${wPx(16)}px;
  width: 100%;
  height: ${height -
  hPx(Platform.OS === 'ios' && height < 700 ? 164 : 180) -
  (StatusBar.currentHeight ?? 0)}px;
`;

export const ProfileEditTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))``;

export const ProfileEditSubtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  margin-top: ${hPx(8)}px;
`;

export const ProfileEditButtonWrapper = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding-horizontal: ${wPx(114)}px;
  padding-bottom: ${hPx(32)}px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.disabled};
`;

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: hPx(10),
  },
});
