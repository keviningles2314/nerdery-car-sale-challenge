import { loginInitialState, User } from './LoginContext';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload?: M[Key];
      };
};

export enum Types {
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
}

type UserPayload = {
  [Types.LOGIN_USER]: {
    userData: User;
  };
  [Types.LOGOUT_USER]: {};
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const loginReducer = (
  state = loginInitialState,
  action: UserActions
) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      if (action.payload) {
        const { userData } = action.payload;

        return {
          ...state,
          isUserAuthenticated: true,
          userData: userData,
        };
      }
      return { ...state };
    case Types.LOGOUT_USER:
      return {
        ...state,
        userData: {
          first_name: '',
          last_name: '',
          email: '',
          id: 0,
        },
        isUserAuthenticated: false,
      };

    default:
      return state;
  }
};
