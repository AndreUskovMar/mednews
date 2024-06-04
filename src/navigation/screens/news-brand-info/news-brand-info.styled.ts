import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Wrapper = styled.View`
  padding: 0 ${wPx(16)}px;
`;

export const HorizontalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))`
  margin-top: ${hPx(16)}px;
`;

export const Subtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  margin-top: ${hPx(32)}px;
`;

export const SubtitleWithMargin = styled(Subtitle).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  margin-bottom: ${hPx(16)}px;
`;

export const LittleSubtitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  margin-top: ${hPx(8)}px;
  margin-bottom: ${hPx(8)}px;
`;

export const TextValue = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  margin-top: ${hPx(8)}px;
`;

export const Website = styled(TextValue).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  color: ${({ theme }) => theme.colors.orange};
`;

export const Separator = styled.View`
  height: ${hPx(16)}px;
  background-color: ${({ theme }) => theme.colors.disabled};
  margin-top: ${hPx(16)}px;
`;
