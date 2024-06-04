import { createSlice } from '@reduxjs/toolkit';
import { AuthResponse } from 'modules/auth/redux/auth.types';

export type AuthState = {
  data: AuthResponse | null;
};

const initialState: AuthState = {
  data: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSave: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    authLogout: () => initialState,
  },
});

export const { authSave, authLogout } = authReducer.actions;

export default authReducer.reducer;
