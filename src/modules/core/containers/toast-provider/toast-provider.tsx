import React, { FC, memo } from 'react';
import { ToastNotification } from '../../components';
import { ToastProvider as Provider } from 'react-native-toast-notifications';

export const ToastProvider: FC<Element> = memo(({ children }) => (
  <Provider
    placement={'top'}
    offset={30}
    renderType={{
      custom_toast: (toast) => <ToastNotification toast={toast} />,
    }}
  >
    {children}
  </Provider>
));
