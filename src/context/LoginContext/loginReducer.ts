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
      if (action.payload) {
        const { userData } = action.payload;

        return {
          ...state,
          isUserAuthenticated: true,
          userData: userData,
        };
      }
      return { ...state };
    case Types.DELETE_USER:
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
