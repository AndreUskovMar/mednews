import { IContactItem } from 'modules/contacts/types/contacts-api.types';

export type ContactItemProps = {
  item: IContactItem;
  onPress: () => void;
};
