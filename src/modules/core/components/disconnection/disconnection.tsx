import React, { memo, useCallback, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

// components
import {
  DisconnectionWrapper,
  Title,
  Description,
  ButtonWrapper,
  Separator,
} from './disconnection.styled';
import { Button, HeaderWithClose } from 'modules/core/components';
import { Icon } from 'modules/core/components/icon';

import { DisconnectionProps } from './disconnection.interface';

export const Disconnection = memo<DisconnectionProps>(
  ({ onPress, isFullScreen }) => {
    const netInfo = useNetInfo();
    const navigation = useNavigation();

    const handleUpdate = useCallback(() => {
      netInfo.isConnected && onPress();
    }, [netInfo, onPress]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', handleUpdate);

      return unsubscribe;
    }, [handleUpdate, navigation]);

    return (
      <React.Fragment>
        {isFullScreen && <HeaderWithClose />}

        <DisconnectionWrapper isFullScreen={isFullScreen}>
          <Icon name={'wifislash'} />
          <Title>{'Keine Internetverbindung\ngefunden.'}</Title>
          <Description>
            {
              'Sie benötigen eine aktive\nInternetverbindung, um die Anwendung\nzu laden.'
            }
          </Description>
          <Description>
            {
              'Bitte überprüfen Sie ihre\nInternetverbindung und laden Sie die\nSeite erneut.'
            }
          </Description>

          {isFullScreen && <Separator />}

          <ButtonWrapper>
            <Button title={'Aktualisieren'} onPress={handleUpdate} />
          </ButtonWrapper>
        </DisconnectionWrapper>
      </React.Fragment>
    );
  }
);
