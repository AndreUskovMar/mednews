import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

// components
import { Button, Typography } from 'modules/core/components';
import { Icon } from 'modules/core/components/icon';

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
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 300;
  width: ${width}px;
  border-top-left-radius: ${wPx(30)}px;
  border-top-right-radius: ${wPx(30)}px;
`;

export const ActionBlockWrapper = styled.View`
  width: 100%;
`;

export const ConnectionButton = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  height: ${hPx(45)}px;
  flex-direction: row;
  align-items: center;
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

export const ContactPhoto = styled(FastImage)`
  width: ${hPx(156)}px;
  height: ${hPx(156)}px;
  border-radius: ${hPx(78)}px;
`;

export const ContactTitle = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h1',
}))`
  text-align: center;
  margin-top: ${hPx(16)}px;
  line-height: 40px;
`;

export const ContactLabel = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  margin-bottom: 4px;
`;

export const ContactOrangeLabel = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h5',
}))`
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const ContactMessage = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'body',
}))`
  text-align: center;
  margin-top: ${hPx(16)}px;
  margin-bottom: ${hPx(32)}px;
  color: ${({ theme }) => theme.colors.grey};
`;

export const ContactIcon = styled(Icon)`
  margin-right: ${wPx(16)}px;
`;

export const Separator = styled.View`
  height: ${hPx(1)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.whitesmoke};
  margin-top: ${hPx(33)}px;
  margin-bottom: ${hPx(32)}px;
`;

export const ButtonWrapper = styled.View`
  width: 80%;
  margin-top: ${hPx(16)}px;
  margin-bottom: ${Platform.select({
    ios: height > 700 ? 32 : 16,
    android: 5,
  })}px;
`;

export const ContactActionButton = styled(Button)<{ grayButton?: boolean }>`
  width: 100%;
  margin-top: ${hPx(16)}px;
  background-color: ${({ theme }) => theme.colors.orange};

  ${({ grayButton }) =>
    grayButton &&
    css`
      background-color: rgb(120, 126, 135);
    `}
`;
