import React, { useState, useEffect } from 'react';

const SweetForm = ({ sweet, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Bengali Sweets',
    price: '',
    quantity: '',
    description: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    'Bengali Sweets',
    'Dry Fruit Sweets', 
    'Milk Sweets',
    'Pure Ghee Sweets',
    'Sugarless Sweets',
    'Chocolates'
  ];

  useEffect(() => {
    if (sweet) {
      // Editing existing sweet
      setFormData({
        name: sweet.name || '',
        category: sweet.category || 'Bengali Sweets',
        price: sweet.price?.toString() || '',
        quantity: sweet.quantity?.toString() || '',
        description: sweet.description || '',
        image: sweet.image || ''
      });
    } else {
      // Creating new sweet - reset to defaults
      setFormData({
        name: '',
        category: 'Bengali Sweets',
        price: '',
        quantity: '',
        description: '',
        image: ''
      });
    }
    // Clear any previous errors
    setErrors({});
  }, [sweet]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Sweet name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Sweet name cannot exceed 100 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || formData.price.trim() === '') {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.quantity || formData.quantity.trim() === '') {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0 || !Number.isInteger(parseFloat(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a non-negative integer';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      quantity: parseInt(formData.quantity) || 0
    };

    console.log('Frontend submitting data:', submitData);
    onSubmit(submitData);
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleSubmit} className="sweet-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Sweet Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter sweet name"
              disabled={loading}
              className="form-input"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <div className="form-error">{errors.category}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={loading}
              className="form-input"
            />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              disabled={loading}
              className="form-input"
            />
            {errors.quantity && <div className="form-error">{errors.quantity}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter sweet description"
            rows="3"
            disabled={loading}
            className="form-textarea"
          />
          {errors.description && <div className="form-error">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg (optional)"
            disabled={loading}
            className="form-input"
          />
          {errors.image && <div className="form-error">{errors.image}</div>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? 'Saving...' : sweet ? 'Update Sweet' : 'Create Sweet'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary btn-lg"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SweetForm;