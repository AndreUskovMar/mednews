import React, { memo } from 'react';

// components
import {
  ContactBrand,
  ContactButton,
  ContactName,
} from './contact-item.styled';

import { ContactItemProps } from './contact-item.interface';

export const ContactItem = memo<ContactItemProps>(({ item, onPress }) => {
  return (
    <ContactButton onPress={onPress}>
      <ContactBrand>{item.brand.companyName}</ContactBrand>
      <ContactName>
        {item.name}, {item.prename}
      </ContactName>
    </ContactButton>
  );
});
