import { createSlice } from '@reduxjs/toolkit';
import { SavedChatsListState } from './chats.types';

export type ChatsState = {
  data: SavedChatsListState;
};

const initialState: Readonly<ChatsState> = {
  data: [],
};

const chatsReducer = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setSavedChatsList: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { setSavedChatsList } = chatsReducer.actions;

export default chatsReducer.reducer;
