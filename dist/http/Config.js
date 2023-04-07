"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const dataBaseConnection = () => {
    const mongoURI = 'mongodb://0.0.0.0:27017/AdminPanel';
    mongoose_1.default
        .connect(mongoURI)
        .then(() => console.log('MongoDB ic connected successfully'))
        .catch((err) => console.log(err));
    mongoose_1.default.set('strictQuery', true);
};
exports.dataBaseConnection = dataBaseConnection;
