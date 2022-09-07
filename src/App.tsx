import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { LoginContextProvider } from './context/LoginContext/LoginContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserCars from './pages/UserCars/UserCars';

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/user-cars' element={<UserCars />} />
          </Route>
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
