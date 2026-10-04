import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PanitiaRoute: React.FC = () => {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('user_role');

  if (!token || (role !== 'panitia' && role !== 'admin')) {
    return <Navigate to="/login/panitia" replace />;
  }

  return <Outlet />;
};