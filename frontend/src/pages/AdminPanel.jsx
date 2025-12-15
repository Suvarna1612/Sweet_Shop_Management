import React, { useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';
import SweetCard from '../components/SweetCard';
import SweetForm from '../components/SweetForm';
import SearchFilter from '../components/SearchFilter';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (Object.keys(params).length > 0) {
        response = await sweetAPI.search(params);
      } else {
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
    loadSweets(params);
  };

  const handleCreateSweet = async (sweetData) => {
    try {
      setFormLoading(true);
      setError(null);
      
      const response = await sweetAPI.create(sweetData);
      
      setSweets(prevSweets => [response.data.data, ...prevSweets]);
      setShowCreateModal(false);
      setSuccess('Sweet created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error creating sweet:', error);
      setError(error.response?.data?.message || 'Failed to create sweet');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSweet = (sweet) => {
    setEditingSweet(sweet);
    setShowEditModal(true);
  };

  const handleUpdateSweet = async (sweetData) => {
    try {
      setFormLoading(true);
      setError(null);
      
      const response = await sweetAPI.update(editingSweet._id, sweetData);
      
      setSweets(prevSweets => 
        prevSweets.map(sweet => 
          sweet._id === editingSweet._id ? response.data.data : sweet
        )
      );
      
      setShowEditModal(false);
      setEditingSweet(null);
      setSuccess('Sweet updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error updating sweet:', error);
      setError(error.response?.data?.message || 'Failed to update sweet');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    if (!window.confirm('Are you sure you want to delete this sweet? This action cannot be undone.')) {
      return;
    }

    try {
      setError(null);
      await sweetAPI.delete(sweetId);
      
      setSweets(prevSweets => prevSweets.filter(sweet => sweet._id !== sweetId));
      setSuccess('Sweet deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting sweet:', error);
      setError(error.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handlePurchase = async (sweetId, quantity) => {
    try {
      setError(null);
      console.log('Admin purchasing sweet:', sweetId, 'quantity:', quantity);
      const response = await sweetAPI.purchase(sweetId, quantity);
      console.log('Admin purchase response:', response.data);
      
      setSweets(prevSweets => 
        prevSweets.map(sweet => {
          if (sweet._id === sweetId) {
            console.log('Admin updating sweet quantity from', sweet.quantity, 'to', response.data.data.remainingStock);
            return { ...sweet, quantity: response.data.data.remainingStock };
          }
          return sweet;
        })
      );
      
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error purchasing sweet:', error);
      setError(error.response?.data?.message || 'Failed to purchase sweet');
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    try {
      setError(null);
      console.log('Restocking sweet:', sweetId, 'quantity:', quantity);
      const response = await sweetAPI.restock(sweetId, quantity);
      console.log('Restock response:', response.data);
      
      setSweets(prevSweets => 
        prevSweets.map(sweet => {
          if (sweet._id === sweetId) {
            console.log('Updating sweet quantity from', sweet.quantity, 'to', response.data.data.newStock);
            return { ...sweet, quantity: response.data.data.newStock };
          }
          return sweet;
        })
      );
      
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error restocking sweet:', error);
      setError(error.response?.data?.message || 'Failed to restock sweet');
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setEditingSweet(null);
  };

  // Calculate statistics
  const totalSweets = sweets.length;
  const totalStock = sweets.reduce((sum, sweet) => sum + sweet.quantity, 0);
  const outOfStock = sweets.filter(sweet => sweet.quantity === 0).length;

  return (
    <div className="main-content">
      <div className="container">
        <div className="admin-dashboard">
          {/* Admin Header with Stats */}
          <div className="admin-header">
            <div style={{ marginBottom: '1rem' }}>
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
            </div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">
              Manage your sweet shop inventory, monitor stock levels, and add new products.
            </p>
            
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">{totalSweets}</div>
                <div className="stat-label">Total Products</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{totalStock}</div>
                <div className="stat-label">Items in Stock</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: outOfStock > 0 ? 'var(--danger-color)' : 'var(--success-color)' }}>
                  {outOfStock}
                </div>
                <div className="stat-label">Out of Stock</div>
              </div>
            </div>

            <div className="admin-actions">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary btn-icon btn-add btn-lg"
              >
                Add New Sweet
              </button>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
              <button onClick={clearMessages} className="alert-close">×</button>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span>{success}</span>
              <button onClick={clearMessages} className="alert-close">×</button>
            </div>
          )}

          {/* Main Content Area */}
          <div className="admin-content">
            {/* Sidebar with Filters */}
            <div className="admin-sidebar">
              <SearchFilter onSearch={handleSearch} loading={loading} />
            </div>

            {/* Main Inventory Area */}
            <div className="admin-main">
              <div className="inventory-header">
                <div>
                  <h2 className="inventory-title">Inventory Management</h2>
                  <div className="inventory-count">
                    {Object.keys(searchParams).length > 0 ? (
                      <span>
                        Found {sweets.length} product{sweets.length !== 1 ? 's' : ''} matching your filters
                      </span>
                    ) : (
                      <span>Managing {sweets.length} product{sweets.length !== 1 ? 's' : ''} in inventory</span>
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading inventory...</p>
                </div>
              ) : sweets.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🍭</div>
                  <h3 className="empty-state-title">
                    {Object.keys(searchParams).length > 0 ? 'No products found' : 'No products in inventory'}
                  </h3>
                  <p className="empty-state-description">
                    {Object.keys(searchParams).length > 0 
                      ? 'Try adjusting your search criteria to find more products.'
                      : 'Start building your sweet shop by adding your first product to the inventory.'
                    }
                  </p>
                  {Object.keys(searchParams).length === 0 && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="btn btn-primary btn-lg btn-icon btn-add"
                    >
                      Add Your First Sweet
                    </button>
                  )}
                </div>
              ) : (
                <div className="sweets-grid">
                  {sweets.map(sweet => (
                    <SweetCard
                      key={sweet._id}
                      sweet={sweet}
                      onEdit={handleEditSweet}
                      onDelete={handleDeleteSweet}
                      onRestock={handleRestock}
                      isAdminView={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Sweet Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={closeModals}
          title="Add New Sweet"
        >
          <SweetForm
            onSubmit={handleCreateSweet}
            onCancel={closeModals}
            loading={formLoading}
          />
        </Modal>

        {/* Edit Sweet Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={closeModals}
          title="Edit Sweet"
        >
          <SweetForm
            sweet={editingSweet}
            onSubmit={handleUpdateSweet}
            onCancel={closeModals}
            loading={formLoading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanel;