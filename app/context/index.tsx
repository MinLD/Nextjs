import { createContext, useContext, useState, ReactNode } from "react";

type ContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children: ReactNode;
};

export const AContext = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: Props) {
  const [user, setUser] = useState<string>("Ahihi");

  return (
    <AContext.Provider value={{ user, setUser }}>{children}</AContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AContext);
  if (!context) {
    throw new Error("useUser must be used within a ContextProvider");
  }
  return context;
};
