const express = require('express');
const router = express.Router();
const {
  getAllSweets,
  getSweetById,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const {
  validateSweet,
  validateSweetUpdate,
  validateSweetSearch,
  validatePurchase,
  validateRestock
} = require('../middleware/validation');

// @route   GET /api/sweets/search
// @desc    Search sweets by name, category, or price range
// @access  Private
router.get('/search', authenticate, validateSweetSearch, searchSweets);

// @route   GET /api/sweets
// @desc    Get all sweets
// @access  Private
router.get('/', authenticate, getAllSweets);

// @route   GET /api/sweets/:id
// @desc    Get sweet by ID
// @access  Private
router.get('/:id', authenticate, getSweetById);

// @route   POST /api/sweets
// @desc    Create a new sweet
// @access  Private (Admin only)
router.post('/', authenticate, requireAdmin, validateSweet, createSweet);

// @route   PUT /api/sweets/:id
// @desc    Update sweet by ID
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, validateSweetUpdate, updateSweet);

// @route   DELETE /api/sweets/:id
// @desc    Delete sweet by ID
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, deleteSweet);

// @route   POST /api/sweets/:id/purchase
// @desc    Purchase a sweet (decrease quantity)
// @access  Private
router.post('/:id/purchase', authenticate, validatePurchase, purchaseSweet);

// @route   POST /api/sweets/:id/restock
// @desc    Restock a sweet (increase quantity)
// @access  Private (Admin only)
router.post('/:id/restock', authenticate, requireAdmin, validateRestock, restockSweet);

module.exports = router;