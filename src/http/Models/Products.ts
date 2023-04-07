import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface Product {
  _id: ObjectId;
  saler_id: Types.ObjectId;
  name: String;
  images: String[];
  sort_description?: String;
  description?: String;
  category_id: Types.ObjectId;
  sub_category_id?: Types.ObjectId;
  child_category_id?: Types.ObjectId;
  brand_id?: Types.ObjectId;
  status: Boolean;
  admin_status: Boolean;
  created_by: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

//PRODUCT SCHEMA
const productSchema = new Schema<Product>(
  {
    saler_id: {
      type: String,
      required: [true, 'Selar is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    images: [
      {
        type: String,
        required: [true, 'Image is required'],
      },
    ],
    sort_description: {
      type: String,
    },
    description: {
      type: String,
    },
    category_id: {
      type: Types.ObjectId,
      ref: 'Categories',
      required: [true, 'Category id is required'],
    },
    sub_category_id: {
      type: Types.ObjectId,
      ref: 'Categories',
    },
    child_category_id: {
      type: Types.ObjectId,
      ref: 'Categories',
    },
    brand_id: {
      type: Types.ObjectId,
      ref: 'Brand',
    },
    status: {
      type: Boolean,
      required: [true, 'Status is required'],
    },
    admin_status: {
      type: Boolean,
      required: [true, 'Admin Status is required'],
    },
    createdAt: {
      type: Date,
      required: [true, 'Creation date is required'],
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: [true, 'Updation date is required'],
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const ProductModel = model<Product>('Product', productSchema);

//GET ALL PRODUCT
export const getProducts = async (status: String): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    ProductModel.find()
      .populate('saler_id', 'category_id', 'sub_category_id', 'brand_id')
      .then((products: any) => resolve(products))
      .catch((error: Error) => reject(error));
  });
};

//GET ALL ACTIVE PRODUCT
export const getProductsByStatus = async (
  status: Boolean
): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    ProductModel.find({ status: status })
      .populate('saler_id', 'category_id', 'sub_category_id', 'brand_id')
      .then((products: any) => resolve(products))
      .catch((error: Error) => reject(error));
  });
};

//GET SINGLE PRODUCT
export const getSingleProduct = async (
  id: Types.ObjectId
): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    ProductModel.findById(id)
      .populate('saler_id', 'category_id', 'sub_category_id', 'brand_id')
      .then((product: any) => resolve(product))
      .catch((error: Error) => reject(error));
  });
};

//ADD PRODUCT
export const addProduct = async (
  name: String,
  images: String[],
  sort_description: String,
  description: String,
  category_id: Types.ObjectId,
  sub_category_id: Types.ObjectId,
  child_category_id: Types.ObjectId,
  brand_id: Types.ObjectId,
  status: Boolean,
  admin_status: Boolean,
  created_by: Types.ObjectId
): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    const product = new ProductModel({
      name,
      images,
      saler_id: '642febd965d6e81092444ffd',
      sort_description,
      description,
      category_id,
      sub_category_id,
      child_category_id,
      brand_id,
      status,
      admin_status,
      created_by,
    });
    product
      .save()
      .then((status) => {
        resolve(status);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

//UPDATE PRODUCT
export const updateProduct = async (
  id: Types.ObjectId,
  update: Partial<Product>
) => {
  return new Promise((resolve, reject) => {
    ProductModel.findOneAndUpdate(id, update, { new: true })
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

//UPDATE PRODUCT STATUS
export const updateProductStatus = async (
  id: Types.ObjectId,
  newStatus: boolean
) => {
  return new Promise((resolve, reject) => {
    ProductModel.findOneAndUpdate(
      {
        _id: id,
      },
      { status: newStatus },
      { upsert: true, useFindAndModify: false }
    )
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

//DELETE PRODUCT
export const updateProductVarient = async (id: Types.ObjectId) => {
  return new Promise((resolve, reject) => {
    ProductModel.findByIdAndDelete(id)
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

//NOTE  : All the varient related function will on varient model
