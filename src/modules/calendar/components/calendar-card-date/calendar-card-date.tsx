import React, { memo } from 'react';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';

import {
  CalendarCardText,
  CalendarTextWrapper,
} from '../calendar-card/calendar-card.styled';
import {
  CalendarCardDateTitle,
  CalendarWrapper,
} from './calendar-card-date.styled';
import { Icon } from 'modules/core/components/icon';

// styles
import { hPx } from 'styles/pixel-ratio';

import { CalendarCardDateProps } from './calendar-card-date.interface';

export const CalendarCardDate = memo<CalendarCardDateProps>(
  ({ date, title }) => {
    const theme = useTheme();
    return (
      <React.Fragment>
        <CalendarCardDateTitle>{title}</CalendarCardDateTitle>
        <CalendarWrapper>
          <Icon
            name={'orangecalendar'}
            color={theme.colors.orange}
            height={hPx(18)}
            width={hPx(18)}
          />
          <CalendarTextWrapper>
            <CalendarCardText>
              {format(new Date(date), 'dd.MM.yyyy')}
            </CalendarCardText>
          </CalendarTextWrapper>
          <Icon
            name={'time'}
            color={theme.colors.orange}
            height={hPx(18)}
            width={hPx(18)}
          />
          <CalendarTextWrapper>
            <CalendarCardText>
              {format(new Date(date), 'HH:mm')}
            </CalendarCardText>
          </CalendarTextWrapper>
        </CalendarWrapper>
      </React.Fragment>
    );
  }
);
