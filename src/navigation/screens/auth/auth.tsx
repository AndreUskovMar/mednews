import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import Config from 'react-native-config';
import { useTheme } from 'styled-components/native';
import { useDispatch } from 'react-redux';

// components
import { SafeArea, Header, Typography } from 'modules/core/components';
import { ContentWrapper } from './auth.styled';

import { dlog } from 'redux/store';
import { authSave } from 'modules/auth/redux/auth.reducers';
import { useAuthUserByCodeInMutation } from 'modules/auth/hooks/use-auth-user-by-code-in-mutation';
import { useRegisterUserIdInMutation } from 'modules/auth/hooks/use-register-user-id-in-mutation';

const qs = require('query-string');

export const Auth = () => {
  const webviewRef = useRef<WebView>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const authUserByCodeInMutation = useAuthUserByCodeInMutation();
  const registerUserInFirestore = useRegisterUserIdInMutation();

  const [isWebViewError, setIsWebViewError] = useState(false);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      const { query } = qs.parseUrl(navState.url);
      if (query?.code && webviewRef.current) {
        webviewRef.current.stopLoading();

        authUserByCodeInMutation.mutate(query.code, {
          onSuccess: (resp) => {
            registerUserInFirestore.mutate(query.uniquekey);
            dispatch(authSave({ ...resp.data, id: query.uniquekey }));
          },
          onError: (err) => {
            dlog(err?.message);
          },
        });
      }
    },
    [authUserByCodeInMutation, registerUserInFirestore, dispatch]
  );

  if (isWebViewError || authUserByCodeInMutation.isError) {
    return (
      <ContentWrapper>
        <Typography variant={'body'}>
          {'Something went wrong. Try again later'}
        </Typography>
      </ContentWrapper>
    );
  }

  return (
    <SafeArea>
      <Header displayBackButton />
      <WebView
        ref={webviewRef}
        source={{
          uri: `${Config.API_URL}/code/?dc_language=de&dc_client_id=${Config.DC_CLIENT_ID}&dc_template=s_mobile`,
        }}
        textZoom={100}
        onNavigationStateChange={onNavigationStateChange}
        domStorageEnabled
        javaScriptEnabled
        thirdPartyCookiesEnabled
        allowFileAccess
        onError={() => {
          setIsWebViewError(true);
        }}
      />
      {authUserByCodeInMutation.isLoading && (
        <ContentWrapper>
          <ActivityIndicator color={theme.colors.orange} size={'large'} />
        </ContentWrapper>
      )}
    </SafeArea>
  );
};
