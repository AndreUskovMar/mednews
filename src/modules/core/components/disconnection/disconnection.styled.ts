import styled, { css } from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, hPx } from 'styles/pixel-ratio';

export const DisconnectionWrapper = styled.View<{ isFullScreen: boolean }>`
  flex: 1;
  height: ${height}px;
  align-items: center;
  justify-content: ${({ isFullScreen }) =>
    isFullScreen ? 'flex-end' : 'center'};

  ${({ isFullScreen }) =>
    isFullScreen &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      padding-bottom: ${hPx(64)}px;
    `}
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  text-align: center;
  margin-bottom: ${hPx(24)}px;
`;

export const Description = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  text-align: center;
  font-size: ${hPx(18)}px;
  margin-bottom: ${hPx(16)}px;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${hPx(102)}px;
`;

export const Separator = styled.View`
  height: ${hPx(71)}px;
`;
