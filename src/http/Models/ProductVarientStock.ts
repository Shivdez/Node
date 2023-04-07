import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface ProductVariantStock {
  _id: ObjectId;
  pincode_id: Types.ObjectId;
  product_variant_id: Types.ObjectId;
  stock: Number;
  next_stock: Number;
  next_stock_date: Date;
  createdAt: Date;
  updatedAt: Date;
}
