import { createContext, useContext, useReducer } from "react";

const WaitingContext = createContext();

function reducer(state, action) {
  return {...action.value};
}

function WaitingProvider({ children }) {
  const [value, dispatch] = useReducer(reducer, '');

  return (
    <WaitingContext.Provider value={{ value, dispatch }}>
      {children}
    </WaitingContext.Provider>
  );
}

function useWainting() {
  const context = useContext(WaitingContext);
  if (!context) {
    throw new Error("Contexto Waiting não encontrado");
  }
  return context;
}

export { useWainting, WaitingProvider };