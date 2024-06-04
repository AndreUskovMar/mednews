export type IProfileName = {
  firstName: string | undefined;
  lastName: string | undefined;
};

export type IProfileAddress = {
  street: string | undefined;
  zip: string | undefined;
  location: string | undefined;
};

export type IProfileType = {
  title: string | undefined;
  name: IProfileName;
  specialties: Array<string> | undefined;
  phone: string | undefined;
  email: string | undefined;
  address: IProfileAddress;
};

export type IProfileFieldNameType = keyof IProfileType;
