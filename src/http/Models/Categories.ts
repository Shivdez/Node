import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface Category {
  _id: ObjectId;
  name: String;
  image: String;
  details: String;
  status: Boolean;
  type: String;
  parent_id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    parent_id: {
      type: Types.ObjectId,
      ref: 'Categories',
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const CategoryModel = model<Category>('Categories', categorySchema);

export const getCategorys = async (type: String): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    CategoryModel.find({ type: type, parent_id: null })
      .populate('subcategories')
      .then((category: any) => resolve(category))
      .catch((error: Error) => reject(error));
  });
};

export const getSubCategorys = async (
  parent_id: Types.ObjectId
): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    CategoryModel.find({ parent_id: parent_id })
      .populate('subcategories')
      .then((category: any) => resolve(category))
      .catch((error: Error) => reject(error));
  });
};

export const getCategoryById = async (
  id: Types.ObjectId
): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    CategoryModel.findOne({ _id: id })
      .populate('subcategories')
      .then((category) => resolve(category))
      .catch((error: Error) => reject(error));
  });
};

export const getCategoryByStatus = async (
  status: Boolean,
  parent_id: Types.ObjectId
): Promise<Category | null> => {
  return new Promise((resolve, reject) => {
    CategoryModel.find({ parent_id: parent_id, status: status })
      .populate('subcategories')
      .then((category: any) => resolve(category))
      .catch((error: Error) => reject(error));
  });
};

export const addCategory = async (
  name: string,
  image: string,
  status: boolean,
  type: String,
  details?: string,
  parent_id?: Types.ObjectId
): Promise<Category> => {
  const category = new CategoryModel({
    name,
    image,
    details,
    type,
    status,
    parent_id,
  });
  return category.save();
};

export const updateCategory = async (
  id: Types.ObjectId,
  update: Partial<Category>
) => {
  return new Promise((resolve, reject) => {
    CategoryModel.findOneAndUpdate(id, update, { new: true })
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const updateCategoryStatus = async (
  id: Types.ObjectId,
  newStatus: boolean
) => {
  return new Promise((resolve, reject) => {
    CategoryModel.findOneAndUpdate(
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
