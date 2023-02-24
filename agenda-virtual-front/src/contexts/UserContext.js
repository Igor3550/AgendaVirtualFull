import { createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";

const UserContext = createContext();

function UserProvider({ children }) {
  const [ value, setValue ] = useStorage('userInfo', {});

  return (
    <UserContext.Provider value={{ value, setValue }}>
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const user = useContext(UserContext);
  if(!user) throw new Error("Contexto user não encontrado!");

  return user;
}

export { UserProvider, useUser };
