export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  id: string;
  name?: string;
  photo?: string;
  specialties?: object;
};
