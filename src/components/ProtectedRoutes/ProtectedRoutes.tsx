import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useLoginContext } from '../../context/LoginContext/LoginContext';

const ProtectedRoutes = () => {
  const { state } = useLoginContext();
  const isAuth = state.isUserAuthenticated;
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
