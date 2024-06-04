import React, { memo, useCallback, useMemo } from 'react';
import { Alert, Linking, Modal } from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';

// components
import { Typography } from 'modules/core/components';
import {
  BackgroundView,
  ActionBottomWrapper,
  CloseButton,
  Wrapper,
  Title,
} from './share-bottom-sheet.styled';
import { Icon } from 'modules/core/components/icon';
import { ShareButton } from 'modules/core/components/share-button';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

// styles
import { wPx } from 'styles/pixel-ratio';

import { ShareBottomSheetProps } from './share-bottom-sheet.interface';

export const ShareBottomSheet = memo<ShareBottomSheetProps>(
  ({ type, subject, body, modalVisible, onPress }) => {
    const user = useSelector(selectAuthValue);

    const title = useMemo<Record<ShareBottomSheetProps['type'], string>>(
      () => ({
        news: 'Möchten Sie den\nArtikel teilen?',
        profile: 'Wie möchten Sie\ndie App\nweiterempfehlen?',
      }),
      []
    );

    const shareEmailData = useMemo(
      () => ({
        title: {
          news: `Empfehlung des 1-Minuten-Beitrages: "${subject}"`,
          profile: subject,
        },
        body: {
          news: `Lieber Kollege, liebe Kollegin, ich habe einen interessanten 1-Minuten-Beitrag zum Thema: "${subject}" gelesen und möchte ihn gern empfehlen.
            \nEr ist als 1-Minuten-Beitrag ist in der App „Orange Salamander“ erschienen und nur für Ärzte und Apotheker zugänglich.
            \nHier der Link zum Beitrag: <a href="${body}">Zum Beitrag</a>
            \nApp kostenlos downloaden:
            \nApple-Store: <a href="${
              Config.APPLE_STORE_APP_URL
            }">Zur iOS App</a>
            \nGoogle-Play-Store: <a href="${
              Config.GOOGLE_PLAY_APP_URL
            }">Zur Android App</a>
            \n
            \nMit freundlichen Grüßen
            \n${user?.name ?? ''}
            `,
          profile: body,
        },
      }),
      [body, subject, user]
    );

    const shareViaEmail = useCallback(async () => {
      try {
        const url = `mailto:?subject=${shareEmailData.title[type]}&body=${shareEmailData.body[type]}`;

        await Linking.openURL(url);
      } catch (error) {
        Alert.alert(
          'Error =>',
          JSON.stringify('Mail app is not installed on the device.')
        );
      }
    }, [shareEmailData, type]);

    const shareViaWhatsapp = useCallback(async () => {
      try {
        let text = encodeURIComponent(
          `Lieber Kollege, liebe Kollegin, ich habe einen interessanten 1-Minuten-Beitrag zum Thema: "${subject}" gelesen und möchte ihn gern empfehlen. Hier der Link zum Beitrag: ${body}`
        );
        let url = `whatsapp://send?text=${text}`;

        await Linking.openURL(url);
      } catch (error) {
        Alert.alert(
          'Error =>',
          JSON.stringify('WhatsApp is not installed on the device.')
        );
      }
    }, [body]);

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
          <Title>{title[type]}</Title>
          <Typography variant={'body'}>
            {'Wählen Sie dazu bitte eine der möglichen Optionen'}
          </Typography>

          <Wrapper>
            <ShareButton
              title={'WhatsApp'}
              iconName={'whatsapp'}
              onPress={shareViaWhatsapp}
            />
            <ShareButton
              title={'E-Mail'}
              iconName={'mail'}
              onPress={shareViaEmail}
            />
          </Wrapper>
        </ActionBottomWrapper>
      </Modal>
    );
  }
);
