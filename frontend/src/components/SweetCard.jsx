import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, onRestock, isAdminView = false }) => {
  const { isAdmin } = useAuth();
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [restockQuantity, setRestockQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    const quantity = parseInt(purchaseQuantity) || 1;
    if (loading || sweet.quantity < quantity || quantity < 1 || sweet.quantity === 0) return;
    
    setLoading(true);
    try {
      await onPurchase(sweet._id, quantity);
      setPurchaseQuantity('');
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    const quantity = parseInt(restockQuantity) || 1;
    if (loading || quantity < 1) return;
    
    setLoading(true);
    try {
      await onRestock(sweet._id, quantity);
      setRestockQuantity('');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Remove external placeholder dependency - we'll use CSS-based fallbacks only

  const getCategoryColor = (category) => {
    const colors = {
      'Bengali Sweets': '#FF6B35',
      'Dry Fruit Sweets': '#8B4513', 
      'Milk Sweets': '#F7DC6F',
      'Pure Ghee Sweets': '#FFD700',
      'Sugarless Sweets': '#32CD32',
      'Chocolates': '#8B4513'
    };
    return colors[category] || '#FF69B4';
  };

  const getCategoryColorDark = (category) => {
    const colors = {
      'Bengali Sweets': '#E55A2B',
      'Dry Fruit Sweets': '#654321', 
      'Milk Sweets': '#F4D03F',
      'Pure Ghee Sweets': '#DAA520',
      'Sugarless Sweets': '#228B22',
      'Chocolates': '#654321'
    };
    return colors[category] || '#C1477C';
  };

  return (
    <div className="sweet-card">
      <div className="sweet-image-container">
        {sweet.image && !imageError ? (
          <img 
            src={sweet.image} 
            alt={sweet.name}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className="sweet-image"
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        ) : null}
        
        {(imageError || !sweet.image || imageLoading) && (
          <div className="sweet-fallback" style={{
            background: `linear-gradient(135deg, ${getCategoryColor(sweet.category)}, ${getCategoryColorDark(sweet.category)})`
          }}>
            {imageLoading ? 'Loading...' : sweet.name}
          </div>
        )}
      </div>
      
      <div className="sweet-content">
        <div className="sweet-header">
          <div>
            <div className="sweet-name">{sweet.name}</div>
            <div className="sweet-category">{sweet.category}</div>
          </div>
        </div>
        
        <div className="sweet-price">{formatPrice(sweet.price)}</div>
        
        <div className="sweet-stock">
          <div className={`stock-indicator ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}></div>
          <span>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        
        {sweet.description && (
          <div className="sweet-description">{sweet.description}</div>
        )}
        
        <div className="sweet-actions">
          {/* Purchase Section - Only show for regular users or non-admin view */}
          {!isAdminView && (
            <div className="purchase-section">
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQuantity}
                placeholder="Qty"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= sweet.quantity)) {
                    setPurchaseQuantity(value);
                  }
                }}
                className="quantity-input"
                disabled={sweet.quantity === 0 || loading}
              />
              <button
                onClick={handlePurchase}
                disabled={sweet.quantity === 0 || loading}
                className={`btn ${sweet.quantity === 0 ? 'btn-secondary' : 'btn-success'}`}
              >
                {loading ? 'Processing...' : sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
              </button>
            </div>
          )}

          {/* Admin Actions - Show when admin or in admin view */}
          {(isAdmin() || isAdminView) && (
            <>
              <div className="admin-section">
                <input
                  type="number"
                  min="1"
                  value={restockQuantity}
                  placeholder="Qty"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || parseInt(value) >= 1) {
                      setRestockQuantity(value);
                    }
                  }}
                  className="quantity-input"
                  disabled={loading}
                />
                <button
                  onClick={handleRestock}
                  disabled={loading}
                  className="btn btn-primary btn-sm btn-icon btn-restock"
                >
                  {loading ? 'Restocking...' : 'Restock'}
                </button>
              </div>
              
              <div className="admin-section">
                <button
                  onClick={() => onEdit(sweet)}
                  className="btn btn-secondary btn-sm btn-icon btn-edit"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(sweet._id)}
                  className="btn btn-danger btn-sm btn-icon btn-delete"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;