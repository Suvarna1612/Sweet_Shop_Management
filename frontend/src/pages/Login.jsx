import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    setErrors({});
    clearError();
    
    const adminCredentials = {
      email: 'admin@sweetshop.com',
      password: 'Admin123'
    };

    console.log('Attempting admin login with:', adminCredentials);
    
    const result = await login(adminCredentials);
    console.log('Admin login result:', result);
    
    setLoading(false);

    if (result.success) {
      console.log('Admin login successful, navigating to /admin');
      // Add a small delay to ensure state is updated
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 100);
    } else {
      console.error('Admin login failed:', result.error);
      // Show the error message
      alert(`Admin login failed: ${result.error}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your sweet shop account</p>
        </div>
        
        {error && (
          <div style={{ 
            background: 'var(--danger-color)', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: 'var(--border-radius)', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              autoComplete="email"
              className="form-input"
            />
            {errors.email && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              autoComplete="current-password"
              className="form-input"
            />
            {errors.password && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>Quick Access</span>
        </div>
        
        <button
          type="button"
          onClick={handleAdminLogin}
          disabled={loading}
          className="admin-quick-login btn-lg"
        >
          {loading ? 'Signing In as Admin...' : '🔑 Admin Login'}
        </button>
        
        <div style={{ 
          background: 'var(--bg-input)', 
          padding: '1rem', 
          borderRadius: 'var(--border-radius)', 
          marginTop: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          <strong>Demo Credentials:</strong><br />
          <code style={{ color: 'var(--secondary-color)' }}>admin@sweetshop.com</code> / Admin123
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;