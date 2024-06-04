import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import { screenNames } from 'modules/core/constants/screen-names';
import { Countries, Specialties } from 'navigation/screens';

const Stack = createNativeStackNavigator();

const AccountInfoStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.specialties} component={Specialties} />
      <Stack.Screen name={screenNames.countries} component={Countries} />
    </Stack.Navigator>
  );
};

export default AccountInfoStack;
