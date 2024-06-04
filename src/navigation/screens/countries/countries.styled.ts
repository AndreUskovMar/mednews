import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  padding: ${wPx(16)}px;
  height: 100%;
  width: 100%;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.disabled};
`;

export const ButtonWrapper = styled.View`
  margin-top: ${hPx(20)}px;
`;

export const FooterTypography = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  opacity: 0.6;
`;

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: hPx(10),
    marginBottom: Platform.select({
      ios: hPx(height > 700 ? 150 : 220),
      android: hPx(200),
    }),
  },
});
