import { ISpecialtyItem } from 'modules/accounts/components/specialty/specialty-item.interface';

export type AccountsContextType = {
  specialties: ISpecialtyItem[];
};

export type ISpecialityResponseType = {
  id: number;
  attributes: {
    createdAt: Date;
    locale: string;
    name: string;
    publishedAt: Date;
    updatedAt: Date;
  };
};
