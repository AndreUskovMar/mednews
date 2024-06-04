import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

export const SearchView = styled.TouchableOpacity`
  height: ${hPx(30)}px;
  margin-bottom: ${hPx(32)}px;
  border-radius: ${hPx(10)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SearchInput = styled.TextInput`
  height: ${hPx(50)}px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  margin-top: ${hPx(7)}px;
  border-radius: ${hPx(10)}px;
  border-width: 1px;
  border-color: rgba(51, 51, 51, 0.15);
  padding-left: ${wPx(10)}px;
  padding-right: ${wPx(10)}px;
  font-size: 13px;
  font-family: 'Mulish-Regular';
`;

export const SearchViewPlaceholder = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.orange};
  padding-left: ${wPx(10)}px;
`;

export const SearchLabel = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.black};
  margin-top: ${hPx(24)}px;
`;

export const SearchResultLabel = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${hPx(24)}px;
`;

export const SearchButtonWrapper = styled.View`
  margin-top: ${hPx(24)}px;
  margin-bottom: ${hPx(24)}px;
`;
