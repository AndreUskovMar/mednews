import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx } from 'styles/pixel-ratio';

export const CalendarCardDateTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  font-size: ${hPx(14)}px;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: ${hPx(8)}px;
`;

export const CalendarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
