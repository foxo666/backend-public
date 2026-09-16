import mongoose from "mongoose";

const options = {

  collection: 'products',
  versionKey: false,
  timestamps: true

}

const productSchema = new mongoose.Schema({

  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },

}, options);

const Product = mongoose.model('Product', productSchema)

export { Product };