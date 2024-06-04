import { createSelector } from '@reduxjs/toolkit';
import { AccountsState } from 'modules/accounts/redux/accounts.reducers';

// types
import type { RootStoreType } from 'redux/reducers';

export const selectAccountsValue = createSelector(
  (state: RootStoreType) => state.accounts,
  (accounts: AccountsState) => accounts.data
);
