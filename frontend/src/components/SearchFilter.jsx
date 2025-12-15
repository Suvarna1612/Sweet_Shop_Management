import { useState } from 'react';

const SearchFilter = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    maxPrice: ''
  });

  const categories = ['', 'Chocolate', 'Candy', 'Gummy', 'Hard Candy', 'Lollipop', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty values
    const filteredParams = Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value && value.toString().trim()) {
        acc[key] = value.toString().trim();
      }
      return acc;
    }, {});

    onSearch(filteredParams);
  };

  const handlePriceRangeSelect = (maxPrice) => {
    const updatedParams = {
      ...searchParams,
      maxPrice
    };
    setSearchParams(updatedParams);
    
    // Auto-search when price range is selected
    const filteredParams = Object.entries(updatedParams).reduce((acc, [key, value]) => {
      if (value && value.toString().trim()) {
        acc[key] = value.toString().trim();
      }
      return acc;
    }, {});
    
    onSearch(filteredParams);
  };

  const handleClear = () => {
    const clearedParams = {
      name: '',
      category: '',
      maxPrice: ''
    };
    setSearchParams(clearedParams);
    onSearch({});
  };

  return (
    <div className="search-sidebar">
      <h3 className="search-title">Filters</h3>
      
      <div className="filter-section">
        <div className="filter-title">Search</div>
        <input
          type="text"
          name="name"
          value={searchParams.name}
          onChange={handleChange}
          placeholder="Search sweets..."
          className="form-input"
          disabled={loading}
        />
      </div>

      <div className="filter-section">
        <div className="filter-title">Category</div>
        <select
          name="category"
          value={searchParams.category}
          onChange={handleChange}
          className="form-select"
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.slice(1).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <div className="filter-title">Price Range</div>
        <div className="price-chips">
          <div
            className={`price-chip ${searchParams.maxPrice === '50' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('50')}
          >
            Under ₹50
          </div>
          <div
            className={`price-chip ${searchParams.maxPrice === '100' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('100')}
          >
            Under ₹100
          </div>
          <div
            className={`price-chip ${searchParams.maxPrice === '200' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('200')}
          >
            Under ₹200
          </div>
          <div
            className={`price-chip ${searchParams.maxPrice === '500' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('500')}
          >
            Under ₹500
          </div>
          <div
            className={`price-chip ${searchParams.maxPrice === '' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('')}
          >
            All Prices
          </div>
        </div>
      </div>

      <div className="filter-section">
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary w-full"
          disabled={loading}
        >
          {loading ? 'Clearing...' : 'Clear All Filters'}
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;