export type ISpecialtyItem = string;

export type SpecialtyItemProps = {
  item: ISpecialtyItem;
  selected: boolean;
  showMySpecialties: (item: string, selected: boolean) => void;
};
