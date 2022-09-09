import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { loginReducer, Types, UserActions } from './loginReducer';

interface LoginContextProviderProps {
  children: ReactNode;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginContext {
  userData: User;
  isUserAuthenticated: boolean;
}

export const loginInitialState = {
  userData: {
    first_name: '',
    last_name: '',
    email: '',
  },
  isUserAuthenticated: false,
};

const LoginContext = createContext<{
  state: LoginContext;
  dispatch: React.Dispatch<UserActions>;
}>({
  state: loginInitialState,
  dispatch: () => null,
});

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);

  useEffect(() => {
    if (localStorage.length > 0 && !state.isUserAuthenticated) {
      const userLocalStorageData = localStorage.getItem('userState')!;

      dispatch({
        type: Types.SET_USER,
        payload: { userData: JSON.parse(userLocalStorageData) },
      });
    } else {
      if (state.isUserAuthenticated) {
        localStorage.setItem('userState', JSON.stringify(state.userData));
      }
    }
  }, [state]);
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
