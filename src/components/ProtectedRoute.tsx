import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) =>
  Cookies.get('hedgeAppCookie') !== 'success' ? (
    <Navigate to="/login" replace />
  ) : (
    children
  );

export default ProtectedRoute;
