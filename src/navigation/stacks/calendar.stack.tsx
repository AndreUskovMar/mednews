import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import { screenNames } from 'modules/core/constants/screen-names';
import { Calendar, CalendarDetail } from 'navigation/screens';

const Stack = createNativeStackNavigator();

export type ParamList = {
  CalendarDetail: { eventId: string };
};

const CalendarStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.calendar} component={Calendar} />
      <Stack.Screen
        name={screenNames['calendar-detail']}
        component={CalendarDetail}
      />
    </Stack.Navigator>
  );
};

export default CalendarStack;
