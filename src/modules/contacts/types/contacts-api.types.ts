export type IContactBrand = {
  id: number;
  name: string;
  about: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
  website: string;
  hotline: string;
  locale: string;
  createdAt: string;
  companyName: string;
  activeIngedrient: string;
};

export type IContactRole = {
  id: number;
  name: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type IContactImage = {
  id: number;
  url: string;
};

export type IContactItem = {
  id: number;
  name: string;
  prename: string;
  username: string;
  provider: string;
  phone: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  email: string;
  brand: IContactBrand;
  role: IContactRole;
  image: IContactImage;
};
