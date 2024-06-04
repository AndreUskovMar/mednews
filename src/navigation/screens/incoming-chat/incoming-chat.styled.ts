import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const LoadingContainer = styled(Root)`
  justify-content: center;
  align-items: center;
`;

export const SendContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${wPx(10)}px;
  margin-right: ${wPx(16)}px;
  height: ${hPx(48)}px;
  width: ${wPx(80)}px;
`;

export const SendButtonTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  font-family: 'Mulish-Bold';
  color: ${({ theme }) => theme.colors.white};
`;

export const ChatFooter = styled.View<{ height: number }>`
  height: ${({ height }) => hPx(height)}px;
`;

export const styles = StyleSheet.create({
  container: {
    borderTopColor: '#fff',
    borderTopWidth: 0,
    paddingTop: hPx(16),
  },
  input: {
    flex: 5,
    height: hPx(78),
    borderRadius: wPx(8),
    paddingHorizontal: wPx(16),
    paddingTop: wPx(8),
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'Mulish-Regular',
    color: '#333333',
  },
});
