import React, { memo } from 'react';

// components
import { Typography } from 'modules/core/components';
import { Icon } from 'modules/core/components/icon';
import { Button } from './share-button.styled';

// styles
import { hPx } from 'styles/pixel-ratio';

import { ShareActionButtonProps } from './share-button.interface';

export const ShareButton = memo<ShareActionButtonProps>(
  ({ iconName, title, onPress }) => (
    <Button onPress={onPress}>
      <Typography variant={'body'}>{title}</Typography>
      <Icon name={iconName} width={hPx(22)} />
    </Button>
  )
);
