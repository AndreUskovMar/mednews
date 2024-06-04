import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { INewsBrand } from 'modules/news/types/news-api.types';

// screens
import { screenNames } from 'modules/core/constants/screen-names';
import {
  News,
  NewsDetail,
  NewsBrandInfo,
  NewsLegalInfo,
  NewsChat,
} from 'navigation/screens';

const Stack = createNativeStackNavigator();

export type ParamList = {
  NewsDetail: { postId: number };
  NewsContactInfo: INewsBrand & { postId: number };
  NewsLegalInfo: { legalContent: string };
};

const FeedStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames.news}
        component={News}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenNames['news-detail']}
        component={NewsDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenNames['news-contact-info']}
        component={NewsBrandInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenNames['news-legal-info']}
        component={NewsLegalInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenNames['news-chat']}
        component={NewsChat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
