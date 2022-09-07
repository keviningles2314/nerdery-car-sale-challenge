import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { loginReducer } from './loginReducer';

interface LoginContextProviderProps {
  children: ReactNode;
}

export type User = {
  first_name: string;
  last_name: string;
  email: string;
};

interface LoginContext {
  userData: User[];
  isUserAuthenticated?: boolean;
  isLoading?: boolean;
}

export const loginInitialState = {
  userData: [],
  isUserAuthenticated: false,
  isLoading: true,
};

const LoginContext = createContext<{
  state: LoginContext;
  dispatch: React.Dispatch<any>;
}>({
  state: loginInitialState,
  dispatch: () => null,
});

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);

  return (
    <LoginContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
