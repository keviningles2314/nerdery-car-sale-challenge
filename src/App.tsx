import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginContextProvider } from './context/LoginContext/LoginContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
