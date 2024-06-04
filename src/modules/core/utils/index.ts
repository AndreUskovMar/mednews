import Config from 'react-native-config';
import { isError } from 'react-query';

export const getStrapiUrlImage = (url: string) => {
  return url.startsWith(Config.STRAPI_URL) ? url : `${Config.STRAPI_URL}${url}`;
};

export const getErrorMessage = (error: unknown): string | undefined => {
  return isError(error) ? error.message : undefined;
};
