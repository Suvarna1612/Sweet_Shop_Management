import React, { useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';
import SweetCard from '../components/SweetCard';
import SearchFilter from '../components/SearchFilter';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (Object.keys(params).length > 0) {
        console.log('Calling sweetAPI.search with params:', params);
        response = await sweetAPI.search(params);
      } else {
        console.log('Calling sweetAPI.getAll()');
        response = await sweetAPI.getAll();
      }
      
      setSweets(response.data.data);
      setSearchParams(params);
    } catch (error) {
      console.error('Error loading sweets:', error);
      setError(error.response?.data?.message || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    console.log('Frontend handleSearch called with params:', params);
    loadSweets(params);
  };

  const handlePurchase = async (sweetId, quantity) => {
    try {
      setError(null);
      const response = await sweetAPI.purchase(sweetId, quantity);
      
      // Update the sweet in the local state
      setSweets(prevSweets => 
        prevSweets.map(sweet => 
          sweet._id === sweetId 
            ? { ...sweet, quantity: response.data.data.remainingStock }
            : sweet
        )
      );
      
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error purchasing sweet:', error);
      setError(error.response?.data?.message || 'Failed to purchase sweet');
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="main-content">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1>Sri Krishna Sweets</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Welcome back, {user?.username}! 
            {user?.role && (
              <span style={{ 
                marginLeft: '0.5rem', 
                padding: '0.25rem 0.75rem', 
                background: 'var(--primary-color)', 
                color: 'white', 
                borderRadius: '15px', 
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                {user.role}
              </span>
            )}
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            Discover the finest traditional sweets from our 30-year legacy of authentic flavors and quality craftsmanship.
          </p>
        </div>

        {error && (
          <div className="error">
            {error}
            <button 
              onClick={clearMessages}
              style={{ 
                float: 'right', 
                background: 'none', 
                border: 'none', 
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="success">
            {success}
            <button 
              onClick={clearMessages}
              style={{ 
                float: 'right', 
                background: 'none', 
                border: 'none', 
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>
        )}

        <div className="sweets-container">
          <SearchFilter onSearch={handleSearch} loading={loading} />

          <div>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading sweets...</p>
              </div>
            ) : (
              <>
                <div className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {Object.keys(searchParams).length > 0 ? (
                    <p>
                      Found {sweets.length} sweet{sweets.length !== 1 ? 's' : ''} matching your filters.
                      {sweets.length === 0 && (
                        <span> Try adjusting your search criteria.</span>
                      )}
                    </p>
                  ) : (
                    <p>Showing all {sweets.length} sweet{sweets.length !== 1 ? 's' : ''} available.</p>
                  )}
                </div>

                {sweets.length === 0 ? (
                  <div className="card text-center">
                    <h3>No sweets found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      {Object.keys(searchParams).length > 0 
                        ? 'Try adjusting your search criteria to find more sweets.'
                        : 'There are no sweets available at the moment.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="sweets-grid">
                    {sweets.map(sweet => (
                      <SweetCard
                        key={sweet._id}
                        sweet={sweet}
                        onPurchase={handlePurchase}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;