import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
// containers
import { Navigator, ToastProvider } from 'modules/core/containers';

// context
import { AccountsContextProvider } from 'modules/accounts/context/accounts-provider';

// styles
import { theme } from 'styles/theme';

import { getStore, persistor } from 'redux/store';

const store = getStore();
const queryClient = new QueryClient();

const App = () => (
  <ToastProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AccountsContextProvider>
            <NavigationContainer
              linking={{
                prefixes: ['https://osala.com', 'osala://'],
                config: {
                  screens: {
                    Home: 'home',
                    Login: 'login',
                  },
                },
              }}
            >
              <ThemeProvider theme={theme}>
                <Navigator />
              </ThemeProvider>
            </NavigationContainer>
          </AccountsContextProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </ToastProvider>
);
export default App;
