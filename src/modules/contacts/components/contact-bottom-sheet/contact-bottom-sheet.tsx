import React, { memo, useCallback } from 'react';
import { Alert, Linking, Modal, Platform, View } from 'react-native';
import { useTheme } from 'styled-components';

// components
import {
  BackgroundView,
  ActionBottomWrapper,
  ActionBlockWrapper,
  ButtonWrapper,
  CloseButton,
  ConnectionButton,
  ContactActionButton,
  ContactIcon,
  ContactLabel,
  ContactOrangeLabel,
  ContactPhoto,
  ContactTitle,
  Separator,
  ContactMessage,
} from './contact-bottom-sheet.styled';
import { Icon } from 'modules/core/components/icon';
import { Typography } from 'modules/core/components';

// utils
import { getStrapiUrlImage } from 'modules/core/utils';

// styles
import { wPx } from 'styles/pixel-ratio';

import { ContactBottomSheetProps } from './contact-bottom-sheet.interface';

export const ContactBottomSheet = memo<ContactBottomSheetProps>(
  ({
    modal: { modalVisible, isMessage, item },
    isSaved,
    onPress,
    onToggleContact,
    onNavigateInChat,
    disabled,
  }) => {
    const theme = useTheme();

    const handleCall = useCallback(async () => {
      try {
        const phoneNumber = Platform.select({
          android: `tel:${item.phone}`,
          ios: `telprompt:${item.phone}`,
        });
        if (phoneNumber) {
          await Linking.openURL(phoneNumber);
        }
      } catch (e) {
        Alert.alert(
          'Error =>',
          JSON.stringify('You cannot call via simulator ')
        );
      }
    }, [item]);

    const handleEmail = useCallback(async () => {
      try {
        await Linking.openURL(`mailto:${item.email}`);
      } catch (e) {
        Alert.alert(
          'Error =>',
          JSON.stringify('Mail app is not installed on the device.')
        );
      }
    }, [item]);

    return (
      <Modal
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={onPress}
        statusBarTranslucent
        transparent
      >
        <BackgroundView />
        <ActionBottomWrapper>
          <CloseButton onPress={onPress}>
            <Icon name={'close'} width={wPx(16)} />
          </CloseButton>

          <ContactPhoto source={{ uri: getStrapiUrlImage(item.image.url) }} />
          <ContactTitle>
            {item.name}, {item.prename}
            {'\n'}
            {item.brand.companyName}
          </ContactTitle>
          <Separator />

          <ActionBlockWrapper>
            <ContactLabel>{'Zuständigkeit'}</ContactLabel>
            <Typography variant={'h4'}>{item.brand.name}</Typography>
          </ActionBlockWrapper>
          <Separator />

          {item.email && (
            <ConnectionButton onPress={handleEmail}>
              <ContactIcon
                name={'orangemail'}
                color={theme.colors.orange}
                width={wPx(30)}
              />
              <View>
                <ContactOrangeLabel>{'E-mail'}</ContactOrangeLabel>
                <Typography variant={'h3'}>{item.email}</Typography>
              </View>
            </ConnectionButton>
          )}

          {item.phone && (
            <ConnectionButton onPress={handleCall}>
              <ContactIcon
                name={'orangephone'}
                color={theme.colors.orange}
                width={wPx(30)}
              />
              <View>
                <ContactOrangeLabel>{'Telefon'}</ContactOrangeLabel>
                <Typography variant={'h3'}>{item.phone}</Typography>
              </View>
            </ConnectionButton>
          )}

          <ButtonWrapper>
            <ContactActionButton
              title={'Nachricht schreiben'}
              onPress={onNavigateInChat}
              disabled={disabled}
            />
            {isMessage ? (
              <ContactMessage>
                {isSaved
                  ? 'Kontakt erfolgreich hinzugefügt!'
                  : 'Kontakt erfolgreich entfernt!'}
              </ContactMessage>
            ) : (
              <ContactActionButton
                title={isSaved ? 'Kontakt entfernen' : 'Kontakt hinzufügen'}
                onPress={onToggleContact}
                disabled={disabled}
                grayButton
              />
            )}
          </ButtonWrapper>
        </ActionBottomWrapper>
      </Modal>
    );
  }
);
