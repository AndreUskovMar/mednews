import React, { FC } from 'react';

import { StyledButton, ButtonTitle } from './button.styled';
import type { ButtonProps } from './button.interface';

export const Button: FC<ButtonProps> = ({ title, textStyle, ...props }) => {
  return (
    <StyledButton {...props}>
      <ButtonTitle allowFontScaling={false} style={textStyle}>
        {title}
      </ButtonTitle>
    </StyledButton>
  );
};
