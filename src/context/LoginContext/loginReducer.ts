import { loginInitialState } from './LoginContext';
import { DELETE_USER, SET_USER } from './types';

export const loginReducer = (
  state = loginInitialState,
  actions: { type: string }
) => {
  switch (actions.type) {
    case SET_USER:
      break;
    case DELETE_USER:
      break;
    default:
      return state;
  }
};
