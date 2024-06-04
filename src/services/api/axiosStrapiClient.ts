import axios from 'axios';
import Config from 'react-native-config';

const axiosStrapiClient = axios.create({
  baseURL: Config.STRAPI_URL,
  headers: {
    Authorization: `Bearer ${Config.STRAPI_API_TOKEN}`,
  },
});

axiosStrapiClient.interceptors.response.use((response) => {
  return response.data;
});

export { axiosStrapiClient };
