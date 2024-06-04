import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// redux
import { setIsBottomBarVisible } from 'modules/core/redux/core.reducers';

export const useBottomBar = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { index } = navigation.getState();

  useEffect(() => {
    if (index === 1 && ['Auth', 'Countries'].indexOf(route.name) === -1) {
      dispatch(setIsBottomBarVisible(false));

      const unsubscribe = navigation.addListener('beforeRemove', () => {
        dispatch(setIsBottomBarVisible(true));
      });

      return unsubscribe;
    }
  }, [navigation, dispatch, index, route]);
};
