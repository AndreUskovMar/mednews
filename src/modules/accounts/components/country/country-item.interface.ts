import { ImageSourcePropType } from 'react-native';

export type ICountryItem = {
  name: string;
  image: ImageSourcePropType;
};

export type CountryItemProps = {
  item: ICountryItem;
  disabled: boolean;
  showMyCountries: (country: string) => void;
};
