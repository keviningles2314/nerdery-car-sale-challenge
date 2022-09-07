import { loginInitialState, User } from './LoginContext';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SET_USER = 'SET_USER',
  DELETE_USER = 'DELETE_USER',
}

type UserPayload = {
  [Types.SET_USER]: {
    userData: User;
  };
  [Types.DELETE_USER]: {};
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const loginReducer = (
  state = loginInitialState,
  action: UserActions
) => {
  switch (action.type) {
    case Types.SET_USER:
      const { userData } = action.payload;

      return {
        ...state,
        isUserAuthenticated: true,
        userData: userData,
      };

    case Types.DELETE_USER:

    default:
      return state;
  }
};
