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
exports.updateCategoryStatus = exports.updateCategory = exports.addCategory = exports.getCategoryByStatus = exports.getCategoryById = exports.getSubCategorys = exports.getCategorys = exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
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
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)('categories', categorySchema);
const getCategorys = (type) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.find({ type: type, parent_id: null })
            .populate('subcategories')
            .then((category) => resolve(category))
            .catch((error) => reject(error));
    });
});
exports.getCategorys = getCategorys;
const getSubCategorys = (parent_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.find({ parent_id: parent_id })
            .populate('subcategories')
            .then((category) => resolve(category))
            .catch((error) => reject(error));
    });
});
exports.getSubCategorys = getSubCategorys;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.findOne({ _id: id })
            .populate('subcategories')
            .then((category) => resolve(category))
            .catch((error) => reject(error));
    });
});
exports.getCategoryById = getCategoryById;
const getCategoryByStatus = (status, parent_id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.find({ parent_id: parent_id, status: status })
            .populate('subcategories')
            .then((category) => resolve(category))
            .catch((error) => reject(error));
    });
});
exports.getCategoryByStatus = getCategoryByStatus;
const addCategory = (name, image, status, type, details, parent_id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new exports.CategoryModel({
        name,
        image,
        details,
        type,
        status,
        parent_id,
    });
    return category.save();
});
exports.addCategory = addCategory;
const updateCategory = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.findOneAndUpdate(id, update, { new: true })
            .then((role) => {
            resolve(role);
        })
            .catch((err) => {
            reject(err);
        });
    });
});
exports.updateCategory = updateCategory;
const updateCategoryStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.CategoryModel.findOneAndUpdate({
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
exports.updateCategoryStatus = updateCategoryStatus;
