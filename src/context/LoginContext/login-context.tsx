import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react"
import {
  loginReducer,
  Types,
  UserActions,
  loginInitialState,
  User,
} from "./login-reducer"

interface LoginContextProviderProps {
  children: ReactNode
}

export interface LoginContext {
  userData: User
  isUserAuthenticated: boolean
}

const LoginContext = createContext<{
  state: LoginContext
  dispatch: React.Dispatch<UserActions>
  logOutHandler: () => void
}>({
  state: loginInitialState,
  dispatch: () => null,
  logOutHandler: () => null,
})

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState)

  useEffect(() => {
    if (localStorage.length > 0 && !state.isUserAuthenticated) {
      if (localStorage.getItem("userState")) {
        const userLocalStorageData = localStorage.getItem("userState")
        if (userLocalStorageData) {
          dispatch({
            type: Types.LOGIN_USER,
            payload: { userData: JSON.parse(userLocalStorageData) },
          })
        }
      }
    } else if (state.isUserAuthenticated) {
      localStorage.setItem("userState", JSON.stringify(state.userData))
    }
  }, [state])

  const logOutHandler = () => {
    dispatch({
      type: Types.LOGOUT_USER,
    })
    localStorage.clear()
  }

  return (
    <LoginContext.Provider
      value={{
        state,
        dispatch,
        logOutHandler,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => {
  const context = useContext(LoginContext)
  if (context === null) {
    throw new Error("useLoginContext must be used within a LoginProvider")
  }
  return context
}
