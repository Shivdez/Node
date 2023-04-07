import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface Product {
  _id: ObjectId;
  selar_id: Types.ObjectId;
  name: String;
  image: String;
  category_id: Types.ObjectId;
  status: Boolean;
  created_by: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
