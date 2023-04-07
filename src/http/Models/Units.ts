import { Error, model, ObjectId, Schema, Types } from 'mongoose';

interface Unit {
  _id: ObjectId;
  name: String;
  status: Boolean;
  created_by: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UnitsSchema = new Schema<Unit>(
  {
    name: {
      type: String,
      required: true,
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

export const UnitsModel = model<Unit>('Unitss', UnitsSchema);

export const getUnits = async (): Promise<Unit | null> => {
  return new Promise((resolve, reject) => {
    UnitsModel.find()
      .then((Units: any) => resolve(Units))
      .catch((error: Error) => reject(error));
  });
};

export const getUnitsById = async (
  id: Types.ObjectId
): Promise<Unit | null> => {
  return new Promise((resolve, reject) => {
    UnitsModel.findOne({ _id: id })
      .then((Units) => resolve(Units))
      .catch((error: Error) => reject(error));
  });
};

export const getUnitsByStatus = async (
  status: Boolean
): Promise<Unit | null> => {
  return new Promise((resolve, reject) => {
    UnitsModel.find({ status: status })
      .then((Units: any) => resolve(Units))
      .catch((error: Error) => reject(error));
  });
};

export const addUnits = async (
  name: string,
  status: boolean
): Promise<Unit> => {
  const Units = new UnitsModel({
    name,
    status,
  });
  return Units.save();
};

export const updateUnits = async (
  id: Types.ObjectId,
  update: Partial<Unit>
) => {
  return new Promise((resolve, reject) => {
    UnitsModel.findOneAndUpdate(id, update, { new: true })
      .then((role) => {
        resolve(role);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const updateUnitsStatus = async (
  id: Types.ObjectId,
  newStatus: boolean
) => {
  return new Promise((resolve, reject) => {
    UnitsModel.findOneAndUpdate(
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
