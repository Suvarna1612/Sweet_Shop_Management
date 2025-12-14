const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sweet name is required"],
      trim: true
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Bengali Sweets",
        "Dry Fruit Sweets",
        "Milk Sweets",
        "Pure Ghee Sweets",
        "Sugarless Sweets",
        "Chocolates"
      ]
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },

    quantity: {
      type: Number,
      default: 0,
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer"
      }
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },

    image: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);


// indexes  are used for efficient searching

sweetSchema.index({ name: "text", description: "text" });
sweetSchema.index({ category: 1 });
sweetSchema.index({ price: 1 });

// to check if product in stock or not



sweetSchema.virtual("inStock").get(function () {
  return this.quantity > 0;
});



// logics for purchase and restock

sweetSchema.methods.purchase = async function (count = 1) {
  if (count <= 0) {
    throw new Error("Purchase quantity must be positive");
  }
  if (this.quantity < count) {
    throw new Error("Insufficient stock");
  }

  this.quantity -= count;
  return this.save();
};

sweetSchema.methods.restock = async function (count) {
  if (count <= 0) {
    throw new Error("Restock quantity must be positive");
  }

  this.quantity += count;
  return this.save();
};

module.exports = mongoose.model("Sweet", sweetSchema);
