import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { LoginContextProvider } from './context/LoginContext/LoginContext';
import CarsList from './pages/CarsList/CarsList';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserCars from './pages/UserCars/UserCars';

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cars-list' element={<CarsList />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/user-cars' element={<UserCars />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
