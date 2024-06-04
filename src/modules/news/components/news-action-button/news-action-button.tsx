import React, { memo } from 'react';
import { useTheme } from 'styled-components';

// components
import { Icon } from 'modules/core/components/icon';
import { Button, Title } from './news-action-button.styled';

// styles
import { hPx } from 'styles/pixel-ratio';

import { NewsActionButtonProps } from './news-action-button.interface';

export const NewsActionButton = memo<NewsActionButtonProps>(
  ({ iconName, title, onPress }) => {
    const theme = useTheme();
    return (
      <Button onPress={onPress}>
        <Title>{title}</Title>
        <Icon name={iconName} color={theme.colors.orange} width={hPx(18)} />
      </Button>
    );
  }
);
