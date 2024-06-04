import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';

export const useToastMessage = () => {
  const toast = useToast();

  const showToastMessage = useCallback(
    (message: string) => {
      toast.show(message, {
        type: 'custom_toast',
        animationDuration: 200,
      });
    },
    [toast]
  );

  const showNewNotificationMessage = useCallback(() => {
    showToastMessage('Sie haben eine neue Nachricht\nerhalten!');
  }, [showToastMessage]);

  return {
    showNewNotificationMessage,
  };
};
