import React, { useCallback } from 'react';
import { ActivityIndicator, Alert, Linking, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

// components
import { Button, Disconnection, Header } from 'modules/core/components';
import {
  Separator,
  CalendarTextWrapper,
  CalendarDetailText,
  Root,
  SubTitle,
  Title,
  BlockName,
  CalendarButtonWrapper,
  CalendarWrapper,
  CalendarDateWrapper,
  CalendarDescriptionText,
  CalendarDetailIcon,
} from './calendar-detail.styled';

// hooks
import { useGetCalendarByIdQuery } from 'modules/calendar/hooks/use-get-calendar-by-id-query';
import { useNavigator } from 'modules/core/hooks/use-navigator';

// utils
import { getErrorMessage } from 'modules/core/utils';

// styles
import { styles } from './calendar-detail.styled';
import { hPx } from 'styles/pixel-ratio';

import { ParamList } from 'navigation/stacks/calendar.stack';

export const CalendarDetail = () => {
  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigator = useNavigator();
  const route = useRoute<RouteProp<ParamList, 'CalendarDetail'>>();
  const { eventId } = route.params;
  const getCalendarById = useGetCalendarByIdQuery(eventId);
  const errorMessage = getErrorMessage(getCalendarById.error);
  const item = getCalendarById.data?.data.attributes;

  const handleWebsite = useCallback(async () => {
    if (!netInfo.isConnected) {
      navigator.reset('Kalender');
      return;
    }

    try {
      if (item) {
        await Linking.openURL(item.website);
      }
    } catch (error) {
      Alert.alert('Error =>', JSON.stringify(error));
    }
  }, [item, netInfo, navigator]);

  if (errorMessage === 'Network Error') {
    return <Disconnection onPress={getCalendarById.refetch} isFullScreen />;
  }

  return (
    <>
      <Header color={theme.colors.orange} displayBackButton />
      <Root bounces={false} contentContainerStyle={!item && styles.emptyList}>
        {getCalendarById.isLoading && (
          <ActivityIndicator color={theme.colors.orange} size={'large'} />
        )}

        {item && (
          <React.Fragment>
            <Title>{item.name}</Title>
            <SubTitle>{'Wichtige Informationen'}</SubTitle>
            <CalendarWrapper>
              <CalendarDetailIcon
                name={'orangecalendar'}
                color={theme.colors.orange}
                height={hPx(22)}
                width={hPx(22)}
              />
              <CalendarTextWrapper>
                <BlockName>{'Wann'}</BlockName>

                <CalendarDateWrapper>
                  <View>
                    <CalendarDetailText>{'Startdatum'}:</CalendarDetailText>
                    <CalendarDetailText>{'Startzeit'}:</CalendarDetailText>
                  </View>
                  <View>
                    <CalendarDetailText>
                      {format(new Date(item.startDate), 'dd.MM.yyyy')}
                    </CalendarDetailText>
                    <CalendarDetailText>
                      {format(new Date(item.startDate), 'HH:mm')}
                    </CalendarDetailText>
                  </View>
                </CalendarDateWrapper>

                <CalendarDateWrapper>
                  <View>
                    <CalendarDetailText>{'Enddatum'}:</CalendarDetailText>
                    <CalendarDetailText>{'Endzeit'}:</CalendarDetailText>
                  </View>
                  <View>
                    <CalendarDetailText>
                      {format(new Date(item.endDate), 'dd.MM.yyyy')}
                    </CalendarDetailText>
                    <CalendarDetailText>
                      {format(new Date(item.endDate), 'HH:mm')}
                    </CalendarDetailText>
                  </View>
                </CalendarDateWrapper>
              </CalendarTextWrapper>
            </CalendarWrapper>
            <Separator />

            <CalendarWrapper>
              <CalendarDetailIcon
                name={'location'}
                color={theme.colors.orange}
                height={hPx(22)}
                width={hPx(22)}
              />
              <CalendarTextWrapper>
                <BlockName>{'Ort'}</BlockName>
                <CalendarDetailText>{item.location}</CalendarDetailText>
              </CalendarTextWrapper>
            </CalendarWrapper>
            <Separator />

            {item.cmePoints && (
              <React.Fragment>
                <CalendarWrapper>
                  <CalendarDetailIcon
                    name={'database'}
                    color={theme.colors.orange}
                    height={hPx(22)}
                    width={hPx(22)}
                  />
                  <CalendarTextWrapper>
                    <BlockName>{'CME-Veranstaltung'}</BlockName>
                    <CalendarDetailText>
                      {item.cmePoints} {'CME-Punkte'}
                    </CalendarDetailText>
                  </CalendarTextWrapper>
                </CalendarWrapper>
                <Separator />
              </React.Fragment>
            )}

            <CalendarWrapper>
              <CalendarDetailIcon
                name={'orangeprofile'}
                color={theme.colors.orange}
                height={hPx(22)}
                width={hPx(22)}
              />
              <CalendarTextWrapper>
                <BlockName>{'Veranstalter'}</BlockName>
                <CalendarDetailText>{item.organizer}</CalendarDetailText>
              </CalendarTextWrapper>
            </CalendarWrapper>

            <SubTitle>{'Was erwartet Sie?'}</SubTitle>
            <CalendarDescriptionText>
              {item.description}
            </CalendarDescriptionText>
          </React.Fragment>
        )}
      </Root>

      {item && (
        <CalendarButtonWrapper>
          <Button title={'Für Event anmelden'} onPress={handleWebsite} />
        </CalendarButtonWrapper>
      )}
    </>
  );
};
