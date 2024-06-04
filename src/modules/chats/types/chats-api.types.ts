import { IContactItem } from 'modules/contacts/types/contacts-api.types';

export type IChatMessage = {
  messageText: string;
  wasRead: boolean;
  sentBy: string;
};

export type IChatItem = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string | undefined;
  createdTo: number | string;
  recentMessage?: IChatMessage;
  contact?: IContactItem;
};
