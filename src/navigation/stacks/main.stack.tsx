import React, { FC } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import { BottomTabBar } from 'modules/core/components';

// hooks
import { useRefreshUserTokensInMutation } from 'modules/auth/hooks/use-refresh-user-tokens-in-mutation';
import { useCheckingUserTokensQuery } from 'modules/auth/hooks/use-checking-user-tokens-query';
import { useGetProfileByIdQuery } from 'modules/profile/hooks/use-get-profile-by-id-query';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';
import { selectIsBottomBarVisible } from 'modules/core/redux/core.selectors';
import { authLogout, authSave } from 'modules/auth/redux/auth.reducers';

// stacks
import FeedStack from 'navigation/stacks/feed.stack';
import CalendarStack from 'navigation/stacks/calendar.stack';
import ContactStack from 'navigation/stacks/contact.stack';
import ProfileStack from 'navigation/stacks/profile.stack';
import { useNotifications } from 'modules/core/hooks/use-notifications';

const Tab = createBottomTabNavigator();

const MainStack: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthValue);
  const isVisible = useSelector(selectIsBottomBarVisible);
  const refreshUserTokensInMutation = useRefreshUserTokensInMutation();

  useNotifications(user?.id ?? '');

  useCheckingUserTokensQuery(user?.access_token ?? '', {
    enabled: !!user?.access_token,
    onSuccess: (data) => {
      if (!data.data.boolIsValid && user) {
        refreshUserTokensInMutation.mutate(user.refresh_token, {
          onSuccess: (resp) => {
            dispatch(authSave({ ...resp.data, id: user?.id }));
          },
          onError: (err) => {
            Alert.alert('Error =>', err.message, [
              { text: 'OK', onPress: () => dispatch(authLogout()) },
            ]);
          },
        });
      }
    },
  });

  useGetProfileByIdQuery(user?.id ?? '', {
    enabled: !!user?.id,
    onSuccess: (resp) => {
      const specialties = new Map(
        (resp?.specialties ?? []).map((item, index) => [index + 1, item])
      );
      dispatch(
        authSave({
          ...user,
          name: `${resp?.name.firstName} ${resp?.name.lastName}`,
          specialties: Object.fromEntries(specialties),
        })
      );
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} isVisible={isVisible} />}
    >
      <Tab.Screen name={'feed'} component={FeedStack} />
      <Tab.Screen name={'calendar'} component={CalendarStack} />
      <Tab.Screen name={'contact'} component={ContactStack} />
      <Tab.Screen name={'profile'} component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainStack;
