import React, { memo, useCallback } from 'react';
import { useTheme } from 'styled-components';

// components
import {
  CalendarButton,
  CalendarCardDescription,
  CalendarCardText,
  CalendarContentWrapper,
  CalendarWrapper,
  CalendarTextWrapper,
} from './calendar-card.styled';
import { Icon } from 'modules/core/components/icon';
import { CalendarCardDate } from 'modules/calendar/components/calendar-card-date';

// styles
import { hPx } from 'styles/pixel-ratio';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

import { CalendarItemProps } from './calendar-card.interface';

export const CalendarCard = memo<CalendarItemProps>(({ item }) => {
  const theme = useTheme();
  const navigator = useNavigator();

  const handleNewsPress = useCallback(() => {
    navigator.push('CalendarDetail', { eventId: item.id });
  }, [item, navigator]);

  return (
    <CalendarButton
      activeOpacity={theme.touchable.activeOpacity}
      onPress={handleNewsPress}
    >
      <CalendarContentWrapper>
        <CalendarCardText>
          {'Veranstalter: '}
          {item.attributes.organizer}
        </CalendarCardText>
        <CalendarCardDescription>
          {item.attributes.name}
        </CalendarCardDescription>
        <CalendarCardDate date={item.attributes.startDate} title={'Start'} />
        <CalendarCardDate date={item.attributes.endDate} title={'Ende'} />
        <CalendarWrapper>
          <Icon
            name={'orangelocation'}
            color={theme.colors.orange}
            height={hPx(18)}
            width={hPx(18)}
          />
          <CalendarTextWrapper>
            <CalendarCardText>{item.attributes.location}</CalendarCardText>
          </CalendarTextWrapper>

          {item.attributes.cmePoints && (
            <React.Fragment>
              <Icon
                name={'orangedatabase'}
                color={theme.colors.orange}
                height={hPx(18)}
                width={hPx(18)}
              />
              <CalendarTextWrapper>
                <CalendarCardText>
                  {item.attributes.cmePoints} {'CME-Punkte'}
                </CalendarCardText>
              </CalendarTextWrapper>
            </React.Fragment>
          )}
        </CalendarWrapper>
      </CalendarContentWrapper>
    </CalendarButton>
  );
});
