import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isSignedIn: boolean;
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isSignedIn,
  children,
}) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
