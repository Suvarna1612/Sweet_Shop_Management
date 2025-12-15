import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute: adminOnly =', adminOnly);
  console.log('ProtectedRoute: isAuthenticated() =', isAuthenticated());
  console.log('ProtectedRoute: isAdmin() =', isAdmin());
  console.log('ProtectedRoute: user =', user);
  console.log('ProtectedRoute: loading =', loading);

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    console.log('ProtectedRoute: Not authenticated, redirecting to login');
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin()) {
    console.log('ProtectedRoute: Admin required but user is not admin, redirecting to dashboard');
    // Redirect to dashboard if user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  console.log('ProtectedRoute: Access granted, rendering children');
  return children;
};

export default ProtectedRoute;