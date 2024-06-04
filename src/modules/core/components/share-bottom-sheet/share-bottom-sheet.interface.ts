export type ShareBottomSheetProps = {
  type: 'news' | 'profile';
  subject: string;
  body: string;
  modalVisible: boolean;
  onPress: () => void;
};
