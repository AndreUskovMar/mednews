import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { axiosStrapiClient } from 'services/api/axiosStrapiClient';
import { ISpecialityResponseType } from 'modules/accounts/types/accounts-api.types';

const GET_SPECIALTIES_LIST_CACHE_KEY = 'GET_SPECIALTIES_LIST';

export const useGetSpecialtiesListQuery = () => {
  return useQuery<
    AxiosResponse<ISpecialityResponseType[]>,
    Error,
    AxiosResponse<ISpecialityResponseType[]>
  >([GET_SPECIALTIES_LIST_CACHE_KEY], async () => {
    return await axiosStrapiClient.get(
      '/api/specializations?pagination[pageSize]=100'
    );
  });
};
