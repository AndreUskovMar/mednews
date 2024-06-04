import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse } from 'axios';
import { axiosClient, OAUTH_PATH } from 'services/api/axiosClinet';

const CHECKING_USER_TOKENS_CACHE_KEY = 'CHECKING_USER_TOKENS';

type ResponseType = AxiosResponse<{
  boolIsValid: boolean;
}>;

export const useCheckingUserTokensQuery = (
  accessToken: string,
  options?: UseQueryOptions<ResponseType, Error, ResponseType, [string, string]>
) => {
  return useQuery(
    [CHECKING_USER_TOKENS_CACHE_KEY, accessToken],
    () =>
      axiosClient.get(
        `${OAUTH_PATH}/checkToken.php?access_token=${accessToken}`
      ),
    options
  );
};
