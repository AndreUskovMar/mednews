import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';

// components
import { Header } from 'modules/core/components';
import { Root } from './contact.styled';

// screens
import { IncomingChats } from 'navigation/screens/incoming-chats';
import { Contacts } from 'navigation/screens/contacts';

// styles
import { hPx } from 'styles/pixel-ratio';

const ContactTab = createMaterialTopTabNavigator();

export const Contact = () => {
  const theme = useTheme();

  return (
    <>
      <Header
        name={'Kontakt'}
        color={theme.colors.orange}
        displayBackButton={false}
      />
      <Root>
        <ContactTab.Navigator
          screenOptions={{
            tabBarAllowFontScaling: false,
            tabBarLabelStyle: { fontSize: hPx(16) },
            tabBarActiveTintColor: theme.colors.orange,
            tabBarInactiveTintColor: theme.colors.tabGrey,
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.orange,
              position: 'absolute',
              zIndex: 10,
              bottom: -2,
              height: 2,
            },
            tabBarStyle: {
              backgroundColor: theme.colors.lightgray,
              borderBottomColor: theme.colors.tabGrey,
              borderBottomWidth: 2,
            },
          }}
        >
          <ContactTab.Screen name={'Posteingang'} component={IncomingChats} />
          <ContactTab.Screen name={'Kontakte'} component={Contacts} />
        </ContactTab.Navigator>
      </Root>
    </>
  );
};
