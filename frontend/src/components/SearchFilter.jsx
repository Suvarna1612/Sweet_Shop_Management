import { useState } from 'react';

const SearchFilter = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    maxPrice: ''
  });

  const categories = [
    '', // Empty option for "All Categories"
    'Bengali Sweets',
    'Dry Fruit Sweets', 
    'Milk Sweets',
    'Pure Ghee Sweets',
    'Sugarless Sweets',
    'Chocolates'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedParams = {
      ...searchParams,
      [name]: value
    };
    setSearchParams(updatedParams);
    
    // Auto-search when category changes
    if (name === 'category') {
      const filteredParams = Object.entries(updatedParams).reduce((acc, [key, value]) => {
        if (value && value.toString().trim()) {
          acc[key] = value.toString().trim();
        }
        return acc;
      }, {});
      
      console.log('SearchFilter category changed, auto-searching with params:', filteredParams);
      onSearch(filteredParams);
    }
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

    console.log('SearchFilter handleSubmit called with params:', filteredParams);
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
    
    console.log('SearchFilter handlePriceRangeSelect called with params:', filteredParams);
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
      
      <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

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
            className={`price-chip ${searchParams.maxPrice === '20' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('20')}
          >
            Under ₹20
          </div>
          <div
            className={`price-chip ${searchParams.maxPrice === '40' ? 'active' : ''}`}
            onClick={() => handlePriceRangeSelect('40')}
          >
            Under ₹40
          </div>
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