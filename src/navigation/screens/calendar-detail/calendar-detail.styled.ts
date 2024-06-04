import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

// components
import { Typography } from 'modules/core/components';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';
import { Icon } from '../../../modules/core/components/icon';

export const Root = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${wPx(16)}px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  color: ${({ theme }) => theme.colors.orange};
`;

export const SubTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h2',
}))`
  font-size: ${hPx(18)}px;
  margin-top: ${hPx(32)}px;
  margin-bottom: ${hPx(8)}px;
`;

export const BlockName = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  font-size: ${hPx(18)}px;
`;

export const CalendarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${wPx(16)}px;
`;

export const CalendarDateWrapper = styled.View`
  display: flex;
  width: 74%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${hPx(5)}px;
`;

export const CalendarTextWrapper = styled.View`
  margin-left: ${wPx(24)}px;
`;

export const CalendarDetailText = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))``;

export const CalendarDescriptionText = styled(CalendarDetailText)`
  color: rgba(51, 51, 51, 0.8);
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.whitesmoke};
`;

export const CalendarButtonWrapper = styled.View`
  position: relative;
  z-index: 20;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${wPx(16)}px ${wPx(72)}px ${wPx(32)}px;
`;

export const CalendarDetailIcon = styled(Icon)`
  margin-top: 2px;
`;

export const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
