import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    reorderLevel: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    lastUpdated: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;