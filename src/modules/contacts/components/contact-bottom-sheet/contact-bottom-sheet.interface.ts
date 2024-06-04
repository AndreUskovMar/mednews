import { IContactItem } from 'modules/contacts/types/contacts-api.types';

export type ContactBottomSheetProps = {
  modal: {
    modalVisible: boolean;
    isMessage: boolean;
    item: IContactItem;
  };
  isSaved: boolean;
  disabled: boolean;
  onPress: () => void;
  onToggleContact: () => void;
  onNavigateInChat: () => void;
};
