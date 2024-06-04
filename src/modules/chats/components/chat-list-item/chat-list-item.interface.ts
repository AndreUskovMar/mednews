import { IContactItem } from 'modules/contacts/types/contacts-api.types';

export type IChatLastMessage = {
  messageText: string;
  wasRead: boolean;
  sentBy: string;
};

export type IChatGroupListItem = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string | undefined;
  members?: Array<number>;
  recentMessage?: IChatLastMessage;
  contact?: IContactItem;
};

export type ChatListItemProps = {
  item: IChatGroupListItem;
};
