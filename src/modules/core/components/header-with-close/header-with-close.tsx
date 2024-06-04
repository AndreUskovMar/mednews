import React, { FC, memo } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

// components
import { Icon } from 'modules/core/components/icon';
import { Root, Wrapper, CloseButton } from './header-with-close.styled';

// utils
import { useNavigator } from 'modules/core/hooks/use-navigator';

// styles
import { hPx } from 'styles/pixel-ratio';

export const HeaderWithClose: FC = memo(() => {
  const navigator = useNavigator();
  const theme = useTheme();

  return (
    <Root bgColor={theme.colors.white}>
      <StatusBar backgroundColor={theme.colors.white} />
      <Wrapper>
        <CloseButton onPress={navigator.back}>
          <Icon name={'close'} color={theme.colors.black} width={hPx(16)} />
        </CloseButton>
      </Wrapper>
    </Root>
  );
});
