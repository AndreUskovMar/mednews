import React, { memo } from 'react';

// components
import { Icon } from 'modules/core/components/icon';
import { Root } from './icon-button.styled';

// styles
import { hPx } from 'styles/pixel-ratio';

import { IconButtonProps } from './icon-button.interface';

export const IconButton = memo<IconButtonProps>(
  ({ iconName, onPress, color, size }) => (
    <Root onPress={onPress} color={color} size={size}>
      <Icon name={iconName} height={hPx(22)} width={hPx(22)} />
    </Root>
  )
);
