import { IProfileFieldNameType } from 'modules/profile/types/profile-api.types';

export type ProfileFieldProps = {
  field: IProfileFieldNameType;
  value: string;
  onPress: () => void;
};
