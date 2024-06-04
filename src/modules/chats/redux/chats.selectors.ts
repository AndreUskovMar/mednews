import { createSelector } from '@reduxjs/toolkit';
// types
import type { RootStoreType } from 'redux/reducers';
import { ChatsState } from './chats.reducers';

export const selectChatsValue = createSelector(
  (state: RootStoreType) => state.chats,
  (chats: ChatsState) => chats.data
);
