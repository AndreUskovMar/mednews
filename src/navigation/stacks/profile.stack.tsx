import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import { screenNames } from 'modules/core/constants/screen-names';
import { Profile, ProfileEdit } from 'navigation/screens';

import { ProfileResponseType } from 'modules/profile/hooks/use-get-profile-by-id-query';
import { IProfileFieldNameType } from 'modules/profile/types/profile-api.types';

const Stack = createNativeStackNavigator();

export type ParamList = {
  ProfileEdit: { field: IProfileFieldNameType; data: ProfileResponseType };
};

const ProfileStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.profile} component={Profile} />
      <Stack.Screen
        name={screenNames['profile-edit']}
        component={ProfileEdit}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
