const Sweet = require('../models/Sweet');

/**
 * Get all sweets
 * @route GET /api/sweets
 * @access Private
 */
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    console.error('Get all sweets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sweets'
    });
  }
};

/**
 * Get sweet by ID
 * @route GET /api/sweets/:id
 * @access Private
 */
const getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.json({
      success: true,
      data: sweet
    });
  } catch (error) {
    console.error('Get sweet by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sweet'
    });
  }
};

/**
 * Search sweets
 * @route GET /api/sweets/search
 * @access Private
 */
const searchSweets = async (req, res) => {
  try {
    console.log('Search request received:', req.query);
    const { name, category, maxPrice } = req.query;
    let query = {};

    // Build search query
    if (name) {
      query.$or = [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: name, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    console.log('Search query built:', query);
    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    console.log('Search results count:', sweets.length);

    res.json({
      success: true,
      count: sweets.length,
      data: sweets,
      searchCriteria: { name, category, maxPrice }
    });
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching sweets'
    });
  }
};

/**
 * Create new sweet
 * @route POST /api/sweets
 * @access Private (Admin only)
 */
const createSweet = async (req, res) => {
  try {
    console.log('Create sweet request body:', req.body);
    const { name, category, price, quantity, description } = req.body;
    const image = req.body.image || req.body.imageUrl || undefined;

    // Check if sweet with same name already exists (using lean() to avoid validation)
    const existingSweet = await Sweet.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    }).lean();

    if (existingSweet) {
      return res.status(400).json({
        success: false,
        message: 'Sweet with this name already exists'
      });
    }

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity,
      description,
      image
    });

    await sweet.save();

    res.status(201).json({
      success: true,
      message: 'Sweet created successfully',
      data: sweet
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating sweet'
    });
  }
};

/**
 * Update sweet
 * @route PUT /api/sweets/:id
 * @access Private (Admin only)
 */
const updateSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description, image } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    // Check if another sweet with the same name exists (excluding current sweet)
    if (name && name !== sweet.name) {
      const existingSweet = await Sweet.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });

      if (existingSweet) {
        return res.status(400).json({
          success: false,
          message: 'Sweet with this name already exists'
        });
      }
    }

    // Update fields
    if (name !== undefined) sweet.name = name;
    if (category !== undefined) sweet.category = category;
    if (price !== undefined) sweet.price = price;
    if (quantity !== undefined) sweet.quantity = quantity;
    if (description !== undefined) sweet.description = description;
    if (image !== undefined) sweet.image = image;

    await sweet.save();

    res.json({
      success: true,
      message: 'Sweet updated successfully',
      data: sweet
    });
  } catch (error) {
    console.error('Update sweet error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID format'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating sweet'
    });
  }
};

/**
 * Delete sweet
 * @route DELETE /api/sweets/:id
 * @access Private (Admin only)
 */
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    await Sweet.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Sweet deleted successfully'
    });
  } catch (error) {
    console.error('Delete sweet error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting sweet'
    });
  }
};

/**
 * Purchase sweet
 * @route POST /api/sweets/:id/purchase
 * @access Private
 */
const purchaseSweet = async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${sweet.quantity} items available`
      });
    }

    await sweet.purchase(quantity);

    res.json({
      success: true,
      message: `Successfully purchased ${quantity} ${sweet.name}(s)`,
      data: {
        sweet: sweet,
        purchasedQuantity: quantity,
        remainingStock: sweet.quantity
      }
    });
  } catch (error) {
    console.error('Purchase sweet error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while processing purchase'
    });
  }
};

/**
 * Restock sweet
 * @route POST /api/sweets/:id/restock
 * @access Private (Admin only)
 */
const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    const previousQuantity = sweet.quantity;
    await sweet.restock(quantity);

    res.json({
      success: true,
      message: `Successfully restocked ${quantity} ${sweet.name}(s)`,
      data: {
        sweet: sweet,
        restockedQuantity: quantity,
        previousStock: previousQuantity,
        newStock: sweet.quantity
      }
    });
  } catch (error) {
    console.error('Restock sweet error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID format'
      });
    }
    if (error.message === 'Restock quantity must be positive') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while restocking sweet'
    });
  }
};

module.exports = {
  getAllSweets,
  getSweetById,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};