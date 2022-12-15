import { Outlet, Navigate } from "react-router-dom"
import { useLoginContext } from "../../context/login-context/login-context"

const PublicRoutes = () => {
  const { state } = useLoginContext()
  const isAuth = state.isUserAuthenticated
  return isAuth ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes
