const { body, query, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    console.log('Request body during validation:', req.body);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * User registration validation rules
 */
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  handleValidationErrors
];

/**
 * User login validation rules
 */
const validateUserLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

/**
 * Sweet creation validation rules
 */
const validateSweet = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Sweet name is required')
    .isLength({ max: 100 })
    .withMessage('Sweet name cannot exceed 100 characters'),
  
  body('category')
    .isIn([
      'Bengali Sweets',
      'Dry Fruit Sweets',
      'Milk Sweets',
      'Pure Ghee Sweets',
      'Sugarless Sweets',
      'Chocolates'
    ])
    .withMessage('Category must be one of: Bengali Sweets, Dry Fruit Sweets, Milk Sweets, Pure Ghee Sweets, Sugarless Sweets, Chocolates'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  // Accept image field (optional)
  body('image')
    .optional()
    .trim()
    .custom((value) => {
      if (value && value !== '') {
        try {
          new URL(value);
          return true;
        } catch {
          throw new Error('Image must be a valid URL');
        }
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * Sweet update validation rules (allows partial updates)
 */
const validateSweetUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Sweet name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Sweet name cannot exceed 100 characters'),
  
  body('category')
    .optional()
    .isIn([
      'Bengali Sweets',
      'Dry Fruit Sweets',
      'Milk Sweets',
      'Pure Ghee Sweets',
      'Sugarless Sweets',
      'Chocolates'
    ])
    .withMessage('Category must be one of: Bengali Sweets, Dry Fruit Sweets, Milk Sweets, Pure Ghee Sweets, Sugarless Sweets, Chocolates'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('imageUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  handleValidationErrors
];

/**
 * Sweet search validation rules
 */
const validateSweetSearch = [
  query('name')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search name must not be empty'),
  
  query('category')
    .optional()
    .isIn([
      'Bengali Sweets',
      'Dry Fruit Sweets',
      'Milk Sweets',
      'Pure Ghee Sweets',
      'Sugarless Sweets',
      'Chocolates'
    ])
    .withMessage('Category must be one of: Bengali Sweets, Dry Fruit Sweets, Milk Sweets, Pure Ghee Sweets, Sugarless Sweets, Chocolates'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  handleValidationErrors
];

/**
 * Purchase validation rules
 */
const validatePurchase = [
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Purchase quantity must be a positive integer'),
  
  handleValidationErrors
];

/**
 * Restock validation rules
 */
const validateRestock = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Restock quantity must be a positive integer'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateSweet,
  validateSweetUpdate,
  validateSweetSearch,
  validatePurchase,
  validateRestock,
  handleValidationErrors
};