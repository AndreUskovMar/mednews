import axios from 'axios';
import Config from 'react-native-config';

export const axiosClient = axios.create({
  baseURL: Config.API_URL,
});

export const OAUTH_PATH = '/service/oauth/access_token';
