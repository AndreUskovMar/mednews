import React from 'react';
import { View } from 'react-native';

// components
import { Typography, Button, SafeArea } from 'modules/core/components';
import { Root, OrangeSalamanderImage, Title } from './intro.styled';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

export const Intro = () => {
  const navigator = useNavigator();

  return (
    <SafeArea>
      <Root>
        <View>
          <OrangeSalamanderImage />
          <Title>{'Herzlich Willkommen bei Orange Salamander'}</Title>
          <Typography variant={'body'}>
            {'Die MedNews-App für Ärzte\nKurz. Aktuell. Relevant.'}
          </Typography>
        </View>
        <Button
          title={'Über DocCheck verifizieren'}
          onPress={() => navigator.push('Auth')}
        />
      </Root>
    </SafeArea>
  );
};
