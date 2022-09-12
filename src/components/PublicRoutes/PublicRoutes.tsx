import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useLoginContext } from '../../context/LoginContext/LoginContext';

const PublicRoutes = () => {
  const { state } = useLoginContext();
  const isAuth = state.isUserAuthenticated;
  return isAuth ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoutes;
