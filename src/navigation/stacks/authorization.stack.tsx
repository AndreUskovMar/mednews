import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import { screenNames } from 'modules/core/constants/screen-names';
import { Auth, Intro } from 'navigation/screens';

const Stack = createNativeStackNavigator();

const AuthorizationStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.intro} component={Intro} />
      <Stack.Screen name={screenNames.auth} component={Auth} />
    </Stack.Navigator>
  );
};

export default AuthorizationStack;
