import { loginInitialState } from './LoginContext';
import { DELETE_USER, SET_USER } from './types';
import { User } from './LoginContext';
export const loginReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_USER:
      const { userData } = action.payload;

      return {
        ...state,
        isUserAuthenticated: true,
        userData: userData.users[0],
      };

    case DELETE_USER:

    default:
      return state;
  }
};
