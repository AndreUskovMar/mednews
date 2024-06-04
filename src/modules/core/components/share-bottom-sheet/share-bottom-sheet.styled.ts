import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components';

// styles
import { height, width, hPx, wPx } from 'styles/pixel-ratio';

export const BackgroundView = styled(Animatable.View).attrs({
  animation: {
    0: {
      opacity: 0,
    },
    0.5: {
      opacity: 0,
    },
    1: {
      opacity: 0.2,
    },
  },
  useNativeDriver: true,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const ActionBottomWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${hPx(32)}px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  z-index: 300;
  width: ${width}px;
  border-top-left-radius: ${wPx(30)}px;
  border-top-right-radius: ${wPx(30)}px;
  height: ${0.84 * height}px;
`;

export const Wrapper = styled.View`
  padding-top: ${hPx(48)}px;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))`
  margin-bottom: ${hPx(16)}px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: ${wPx(30)}px;
  height: ${wPx(30)}px;
  padding: ${wPx(8)}px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;
