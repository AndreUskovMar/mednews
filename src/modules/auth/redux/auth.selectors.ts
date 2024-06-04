import { createSelector } from '@reduxjs/toolkit';
// types
import type { RootStoreType } from 'redux/reducers';
import type { AuthState } from 'modules/auth/redux/auth.reducers';

export const selectAuthValue = createSelector(
  (state: RootStoreType) => state.auth,
  (auth: AuthState) => auth.data
);
