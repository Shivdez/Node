"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//PRODUCT SCHEMA
const productSchema = new mongoose_1.Schema({
    saler_id: {
        type: String,
        required: [true, 'Selar is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    images: {
        type: String,
        required: [true, 'Image is required'],
    },
    sort_description: {
        type: String,
    },
    description: {
        type: String,
    },
    category_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Categories',
        required: [true, 'Category id is required'],
    },
    sub_category_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Categories',
    },
    child_category_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Categories',
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
}, { timestamps: true });
//ADD PRODUCT
