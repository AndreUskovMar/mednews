import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import { screenNames } from 'modules/core/constants/screen-names';
import { Contact, Contacts, IncomingChat } from 'navigation/screens';

import { IContactItem } from 'modules/contacts/types/contacts-api.types';

const Stack = createNativeStackNavigator();

export type ParamList = {
  IncomingChat: { chatId: string; contact: IContactItem };
};

const ContactStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.contact} component={Contact} />
      <Stack.Screen
        name={screenNames['contacts-search']}
        component={Contacts}
      />
      <Stack.Screen
        name={screenNames['incoming-chat']}
        component={IncomingChat}
      />
    </Stack.Navigator>
  );
};

export default ContactStack;
