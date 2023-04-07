import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface ProductVariant {
  _id: ObjectId;
  product_id: Types.ObjectId;
  price: String;
  discount_price: String;
  measurement: String;
  unit_id: Types.ObjectId;
  variant_stock_id: Types.ObjectId;
  status: Boolean;
  admin_status: Boolean;
  created_by: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
