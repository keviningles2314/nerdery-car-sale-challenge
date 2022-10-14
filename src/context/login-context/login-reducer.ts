type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload?: M[Key]
      }
}

export enum Types {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

export interface User {
  firstName: string
  lastName: string
  email: string
  id: number
}

type UserPayload = {
  [Types.LOGIN_USER]: {
    userData: User
  }
  [Types.LOGOUT_USER]: unknown
}

export const loginInitialState = {
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    id: 0,
  },
  isUserAuthenticated: false,
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export const loginReducer = (
  state = loginInitialState,
  action: UserActions
) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      if (action.payload) {
        const { userData } = action.payload

        return {
          ...state,
          isUserAuthenticated: true,
          userData,
        }
      }
      return { ...state }
    case Types.LOGOUT_USER:
      return {
        ...state,
        userData: {
          firstName: "",
          lastName: "",
          email: "",
          id: 0,
        },
        isUserAuthenticated: false,
      }

    default:
      return state
  }
}
