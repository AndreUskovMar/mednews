import { RootStoreType } from 'redux/reducers';

export const selectIsBottomBarVisible = (state: RootStoreType) => {
  return state.core.data.bottomBarState.isVisible;
};
