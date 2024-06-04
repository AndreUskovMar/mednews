import React, { FC, memo, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

// components
import { Icon } from 'modules/core/components/icon';
import { Root, Wrapper, BackButton, Title } from './header.styled';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';
import { hPx } from 'styles/pixel-ratio';

// hooks
import { useBottomBar } from 'modules/core/hooks/use-bottom-bar';

import type { HeaderProps } from './header.interface';

export const Header: FC<HeaderProps> = memo(
  ({ name, color, displayBackButton = false }) => {
    useBottomBar();
    const navigator = useNavigator();
    const theme = useTheme();

    const bgColor = useMemo(() => color || theme.colors.white, [color, theme]);
    const textColor = useMemo(
      () => (color ? theme.colors.white : theme.colors.black),
      [color, theme]
    );

    return (
      <Root bgColor={bgColor}>
        <StatusBar backgroundColor={bgColor} />
        <Wrapper>
          {displayBackButton && (
            <BackButton onPress={navigator.back}>
              <Icon name={'back'} color={textColor} width={hPx(24)} />
            </BackButton>
          )}
          {name && <Title color={textColor}>{name}</Title>}
        </Wrapper>
      </Root>
    );
  }
);
