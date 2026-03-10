import { createContext, useContext, useState, ReactNode } from "react";

export type AccountType = "creator" | "restaurant" | "enterprise" | "destination";

interface AccountTypeContextValue {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

const AccountTypeContext = createContext<AccountTypeContextValue>({
  accountType: "destination",
  setAccountType: () => {},
});

export const AccountTypeProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountType] = useState<AccountType>(
    () => (localStorage.getItem("meridian-account-type") as AccountType) || "destination"
  );

  const handleSet = (type: AccountType) => {
    setAccountType(type);
    localStorage.setItem("meridian-account-type", type);
  };

  return (
    <AccountTypeContext.Provider value={{ accountType, setAccountType: handleSet }}>
      {children}
    </AccountTypeContext.Provider>
  );
};

export const useAccountType = () => useContext(AccountTypeContext);
