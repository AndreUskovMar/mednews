import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootStoreType } from 'redux/reducers';
import { AccountProps } from 'modules/accounts/redux/accounts.types';

//stacks
import AuthorizationStack from 'navigation/stacks/authorization.stack';
import AccountInfoStack from 'navigation/stacks/account-info.stack';
import MainStack from 'navigation/stacks/main.stack';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const { auth, accounts } = useSelector((store: RootStoreType) => store);
  const myAccount = accounts.data.find(
    (account: AccountProps) => account?.id === auth.data?.id
  );

  return (
    <Stack.Navigator>
      {myAccount ? (
        <Stack.Screen
          name={'main'}
          component={MainStack}
          options={{ headerShown: false }}
        />
      ) : auth.data ? (
        <Stack.Screen
          name={'accountInfo'}
          component={AccountInfoStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name={'authorization'}
          component={AuthorizationStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
