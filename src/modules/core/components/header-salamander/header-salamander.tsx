import React, { FC, memo } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

// components
import { Root, Title, OrangeSalamanderImage } from './header-salamander.styled';

export const HeaderSalamander: FC = memo(() => {
  const theme = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.orange}
        barStyle={'dark-content'}
      />
      <Root>
        <OrangeSalamanderImage />
        <Title>{'Orange\nSalamander'}</Title>
      </Root>
    </>
  );
});
