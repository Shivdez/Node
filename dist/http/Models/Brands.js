"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrandStatus = exports.updateBrand = exports.addBrand = exports.getBrandByStatus = exports.getBrandById = exports.getBrands = exports.BrandModel = void 0;
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.BrandModel = (0, mongoose_1.model)('brands', brandSchema);
const getBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.find()
            .then((Brand) => resolve(Brand))
            .catch((error) => reject(error));
    });
});
exports.getBrands = getBrands;
const getBrandById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.findOne({ _id: id })
            .then((Brand) => resolve(Brand))
            .catch((error) => reject(error));
    });
});
exports.getBrandById = getBrandById;
const getBrandByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.find({ status: status })
            .populate('subcategories')
            .then((Brand) => resolve(Brand))
            .catch((error) => reject(error));
    });
});
exports.getBrandByStatus = getBrandByStatus;
const addBrand = (name, image, status, details) => __awaiter(void 0, void 0, void 0, function* () {
    const Brand = new exports.BrandModel({
        name,
        image,
        details,
        status,
    });
    return Brand.save();
});
exports.addBrand = addBrand;
const updateBrand = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.findOneAndUpdate(id, update, { new: true })
            .then((role) => {
            resolve(role);
        })
            .catch((err) => {
            reject(err);
        });
    });
});
exports.updateBrand = updateBrand;
const updateBrandStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.findOneAndUpdate({
            _id: id,
        }, { status: newStatus }, { upsert: true, useFindAndModify: false })
            .then((role) => {
            resolve(role);
        })
            .catch((err) => {
            reject(err);
        });
    });
});
exports.updateBrandStatus = updateBrandStatus;
//DELETE BRAND
const deleteBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.BrandModel.findByIdAndDelete(id)
            .then((status) => resolve(status))
            .catch((err) => reject(err));
    });
});
exports.deleteBrand = deleteBrand;
