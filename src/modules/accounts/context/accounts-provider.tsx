import React, { createContext, useMemo } from 'react';

// hooks
import { useGetSpecialtiesListQuery } from 'modules/accounts/hooks/use-get-specialties-list-query';

import { AccountsContextType } from 'modules/accounts/types/accounts-api.types';

export const AccountsContext = createContext<AccountsContextType>({
  specialties: [],
});

export const AccountsContextProvider: React.FC = ({ children }) => {
  const getSpecialtiesList = useGetSpecialtiesListQuery();

  const specialties = useMemo(() => {
    return (
      getSpecialtiesList.data?.data.map(
        (specialty) => specialty.attributes.name
      ) ?? []
    );
  }, [getSpecialtiesList]);

  return (
    <AccountsContext.Provider
      value={{
        specialties,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
