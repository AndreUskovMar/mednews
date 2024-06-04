import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

// components
import { Icon } from 'modules/core/components/icon';
import { Typography } from 'modules/core/components/typography';

// styles
import { wPx, hPx, height } from 'styles/pixel-ratio';

export const bottomTabBarHeightPx = hPx(66);
export const bottomTabBarMarginBottomPx = hPx(
  Platform.OS === 'ios' && height > 700 ? 20 : 5
);

export const Root = styled(Animatable.View).attrs({
  transition: ['bottom'],
})<{ isVisible: boolean }>`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${wPx(30)}px;
  padding-right: ${wPx(30)}px;
  padding-bottom: ${bottomTabBarMarginBottomPx}px;
  padding-top: ${hPx(5)}px;
  background-color: rgba(255, 255, 255, 1);
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.disabled};

  ${(props) =>
    !props.isVisible &&
    css`
      bottom: -100px;
    `}
`;

export const Tab = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: ${bottomTabBarHeightPx}px;
`;

export const TabContent = styled.View``;

export const TabIcon = styled(Icon)`
  opacity: 1;
  align-self: center;
`;

export const TabName = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'small',
}))<{
  isActive: boolean;
}>`
  opacity: 1;
  text-align: center;
  margin-top: ${hPx(Platform.OS === 'ios' ? -35 : -40)}px;
  color: ${({ theme }) => theme.colors.orange};

  ${(props) =>
    !props.isActive &&
    css`
      color: ${({ theme }) => theme.colors.grey};
    `}
`;
