import { createSlice } from '@reduxjs/toolkit';
import { AccountProps } from 'modules/accounts/redux/accounts.types';

export type AccountsState = {
  data: Array<AccountProps>;
};

const initialState = {
  data: [],
};

const accountsReducer = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    accountsSet: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { accountsSet } = accountsReducer.actions;

export default accountsReducer.reducer;
