import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { loginReducer } from './loginReducer';

interface LoginContextProviderProps {
  children: ReactNode;
}

interface LoginContext {
  userData?: string[];
  isUserAuthenticated?: boolean;
  isLoading?: boolean;
}

export const loginInitialState: LoginContext = {
  userData: [],
  isUserAuthenticated: false,
  isLoading: true,
};

const LoginContext = createContext<LoginContext>(loginInitialState);

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);

  const value = {
    ...state,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
