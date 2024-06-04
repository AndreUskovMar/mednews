import styled from 'styled-components/native';
import { height, hPx, wPx } from 'styles/pixel-ratio';
import { Platform, StyleSheet } from 'react-native';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const ProfileContent = styled.ScrollView``;

export const ProfileFieldsWrapper = styled.View`
  padding: ${hPx(24)}px ${wPx(16)}px;
`;

export const Separator = styled.View`
  height: ${hPx(1)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whitesmoke};
  margin-top: ${hPx(24)}px;
  margin-bottom: ${hPx(24)}px;
`;

export const styles = StyleSheet.create({
  indicator: {
    marginTop: '80%',
  },
  emptyList: {
    flex: 1,
    width: '100%',
    marginTop: hPx(20),
    marginBottom: hPx(Platform.OS === 'ios' && height > 700 ? 130 : 100),
  },
});
