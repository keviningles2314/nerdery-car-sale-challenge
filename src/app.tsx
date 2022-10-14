import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout"
import ProtectedRoutes from "./components/protected-routes/protected-routes"
import PublicRoutes from "./components/public-routes/public-routes"
import { LoginContextProvider } from "./context/login-context/login-context"
import AddCar from "./pages/add-car/add-car"
import CarDetail from "./pages/car-detail/car-detail"
import CarsList from "./pages/cars-list/cars-list"
import Home from "./pages/Home/home"
import Login from "./pages/login/login"
import UserCars from "./pages/user-cars/user-cars"
import { setContext } from "@apollo/client/link/context"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client"

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
    },
  }
})

export const client = new ApolloClient({
  // eslint-disable-next-line unicorn/prefer-spread
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
})
//
const App = () => {
  return (
    <ApolloProvider client={client}>
      <LoginContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/add-a-car" element={<AddCar />} />
              <Route path="/cars-list" element={<CarsList />} />
              <Route path="/car/:idCar" element={<CarDetail />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/user-cars" element={<UserCars />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </LoginContextProvider>
    </ApolloProvider>
  )
}

export default App
