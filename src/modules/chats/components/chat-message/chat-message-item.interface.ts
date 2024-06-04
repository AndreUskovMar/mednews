import { IMessage } from 'react-native-gifted-chat';

export interface ChatMessageItemProps extends IMessage {
  chatId: string;
  type: 'text' | 'image' | 'video';
  createdAt: number;
  updatedAt: number;
  wasRead: boolean;
  wasDeleted: boolean;
  user: {
    _id: string | number;
    name: string;
    avatar: string;
  };
}
