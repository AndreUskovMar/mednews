import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const CalendarButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom-width: 0;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 1px 4px;
  elevation: 1;
  flex-wrap: nowrap;
  border-radius: ${wPx(8)}px;
  margin: ${wPx(8)}px ${wPx(16)}px;
`;

export const CalendarContentWrapper = styled.View`
  margin: ${wPx(16)}px;
  padding-left: ${wPx(24)}px;
  border-left-width: ${wPx(8)}px;
  border-left-color: ${({ theme }) => theme.colors.orange};
`;

export const CalendarCardText = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  font-size: ${hPx(14)}px;
  color: rgba(51, 51, 51, 0.8);
  margin-bottom: ${hPx(8)}px;
`;

export const CalendarCardDescription = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h4',
}))`
  font-size: ${hPx(18)}px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${hPx(20)}px;
`;

export const CalendarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${hPx(8)}px;
`;

export const CalendarTextWrapper = styled.View`
  margin-left: ${wPx(8)}px;
  width: ${wPx(120)}px;
`;
