import { createSlice } from '@reduxjs/toolkit';
import { BottomBarState } from 'modules/core/redux/core.types';

export type CoreState = {
  data: {
    bottomBarState: BottomBarState;
  };
};

const initialState: Readonly<CoreState> = {
  data: {
    bottomBarState: {
      isVisible: true,
    },
  },
};

const coreReducer = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setIsBottomBarVisible: (state, action) => ({
      ...state,
      data: {
        ...state.data,
        bottomBarState: {
          isVisible: action.payload,
        },
      },
    }),
  },
});

export const { setIsBottomBarVisible } = coreReducer.actions;

export default coreReducer.reducer;
