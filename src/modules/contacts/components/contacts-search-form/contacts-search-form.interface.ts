export type ContactsSearchFormProps = {
  onSearch?: (data: {
    name: string;
    brand: string;
    isSearchResult: boolean;
  }) => void;
  isSearchResult: boolean;
};
