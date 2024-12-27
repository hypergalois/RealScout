import { createContext } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children}: { children: React.ReactNode }) => {
    return (
        <GlobalContext.Provider value={{
        isLoggedIn: false,
        user: null,
        loading: false,
        refetch: async (newParams) => {
          console.log(newParams);
        },
        }}>
        {children}
        </GlobalContext.Provider>
}