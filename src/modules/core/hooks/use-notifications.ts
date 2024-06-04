import { useEffect, useCallback } from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

// utils
import { dlog } from 'redux/store';
import { useToastMessage } from './use-toast-message';

export const useNotifications = (userId: string) => {
  const { showNewNotificationMessage } = useToastMessage();

  const requestUserPermission = useCallback(async () => {
    const token = await messaging().getToken();
    dlog('My device token is ', token);

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          fcmTokens: firestore.FieldValue.arrayUnion(token),
        });
    }
  }, [userId]);

  useEffect(() => {
    (() => requestUserPermission())();

    // It will trigger when app was in background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      dlog(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    // It will trigger when app was in quit mode
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          dlog(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      });

    // If App is in foreground mode
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      if (remoteMessage) {
        dlog('A new FCM message arrived:', remoteMessage.notification);
        showNewNotificationMessage();
      }
    });

    return unsubscribe;
  }, [requestUserPermission, showNewNotificationMessage]);
};
