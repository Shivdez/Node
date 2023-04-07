import mongoose from 'mongoose';
require('dotenv').config();

const dataBaseConnection = () => {
  const mongoURI = 'mongodb://0.0.0.0:27017/AdminPanel';
  mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB ic connected successfully'))
    .catch((err: any) => console.log(err));
  mongoose.set('strictQuery', true);
};

export { dataBaseConnection };
