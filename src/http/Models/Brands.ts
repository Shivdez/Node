import mongoose, {
  Error,
  model,
  mongo,
  ObjectId,
  Schema,
  Types,
} from 'mongoose';

interface Brand {
  _id: ObjectId;
  name: String;
  image: String;
  details: String;
  status: Boolean;
  type: String;
  created_by: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<Brand>(
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
    status: {
      type: Boolean,
      required: true,
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

export const BrandModel = model<Brand>('brands', brandSchema);

export const getBrands = async (): Promise<Brand | null> => {
  return new Promise((resolve, reject) => {
    BrandModel.find()
      .then((Brand: any) => resolve(Brand))
      .catch((error: Error) => reject(error));
  });
};

export const getBrandById = async (
  id: Types.ObjectId
): Promise<Brand | null> => {
  return new Promise((resolve, reject) => {
    BrandModel.findOne({ _id: id })
      .then((Brand) => resolve(Brand))
      .catch((error: Error) => reject(error));
  });
};

export const getBrandByStatus = async (
  status: Boolean
): Promise<Brand | null> => {
  return new Promise((resolve, reject) => {
    BrandModel.find({ status: status })
      .populate('subcategories')
      .then((Brand: any) => resolve(Brand))
      .catch((error: Error) => reject(error));
  });
};

export const addBrand = async (
  name: string,
  image: string,
  status: boolean,
  details?: string
): Promise<Brand> => {
  const Brand = new BrandModel({
    name,
    image,
    details,
    status,
  });
  return Brand.save();
};

export const updateBrand = async (
  id: Types.ObjectId,
  update: Partial<Brand>
) => {
  return new Promise((resolve, reject) => {
    BrandModel.findOneAndUpdate(id, update, { new: true })
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const updateBrandStatus = async (
  id: Types.ObjectId,
  newStatus: boolean
) => {
  return new Promise((resolve, reject) => {
    BrandModel.findOneAndUpdate(
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

//DELETE BRAND
export const deleteBrand = async (id: Types.ObjectId) => {
  return new Promise((resolve, reject) => {
    BrandModel.findByIdAndDelete(id)
      .then((status) => resolve(status))
      .catch((err: Error) => reject(err));
  });
};
