import { useCallback, useMemo } from 'react';
import { LogBox } from 'react-native';
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';

// redux
import { selectAuthValue } from 'modules/auth/redux/auth.selectors';

LogBox.ignoreLogs(['Error: Piwik Pro SDK has been already initialized']);

PiwikProSdk.init(Config.PIWIK_SERVER_ADDRESS, Config.PIWIK_WEBSITE_ID);

type CategoryProps = 'clickArticle' | 'viewArticle' | 'previewArticle';

export const usePiwikSdk = (id?: number) => {
  const user = useSelector(selectAuthValue);

  const actionNames = useMemo<Record<CategoryProps, string>>(
    () => ({
      clickArticle: 'CLICK_NEWS_ARTICLE',
      viewArticle: 'VIEW_NEWS_ARTICLE',
      previewArticle: 'PREVIEW_NEWS_ARTICLE',
    }),
    []
  );

  const trackEvent = useCallback(
    async (category: CategoryProps) => {
      const options = {
        name: category,
        value: id,
        customDimensions: user?.specialties,
      };

      await PiwikProSdk.trackCustomEvent(
        category,
        actionNames[category],
        options
      );
    },
    [id, user, actionNames]
  );

  return {
    trackEvent,
  };
};
