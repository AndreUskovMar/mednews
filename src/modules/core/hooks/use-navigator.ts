import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { useCallback } from 'react';

export const useNavigator = () => {
  const navigation = useNavigation();

  const push = useCallback(
    (route: string, params?: object) => {
      navigation.dispatch(StackActions.push(route, params));
    },
    [navigation]
  );

  const replace = useCallback(
    (route: string, params?: object) => {
      navigation.dispatch(StackActions.replace(route, params));
    },
    [navigation]
  );

  const reset = useCallback(
    (name: string) => {
      navigation.dispatch(
        CommonActions.reset({ index: 1, routes: [{ name }] })
      );
    },
    [navigation]
  );

  const back = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return { push, replace, reset, back };
};
