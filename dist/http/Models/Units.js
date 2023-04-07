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
exports.updateUnitsStatus = exports.updateUnits = exports.addUnits = exports.getUnitsByStatus = exports.getUnitsById = exports.getUnits = exports.UnitsModel = void 0;
const mongoose_1 = require("mongoose");
const UnitsSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.UnitsModel = (0, mongoose_1.model)('Unitss', UnitsSchema);
const getUnits = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.UnitsModel.find()
            .then((Units) => resolve(Units))
            .catch((error) => reject(error));
    });
});
exports.getUnits = getUnits;
const getUnitsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.UnitsModel.findOne({ _id: id })
            .then((Units) => resolve(Units))
            .catch((error) => reject(error));
    });
});
exports.getUnitsById = getUnitsById;
const getUnitsByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.UnitsModel.find({ status: status })
            .then((Units) => resolve(Units))
            .catch((error) => reject(error));
    });
});
exports.getUnitsByStatus = getUnitsByStatus;
const addUnits = (name, status) => __awaiter(void 0, void 0, void 0, function* () {
    const Units = new exports.UnitsModel({
        name,
        status,
    });
    return Units.save();
});
exports.addUnits = addUnits;
const updateUnits = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.UnitsModel.findOneAndUpdate(id, update, { new: true })
            .then((role) => {
            resolve(role);
        })
            .catch((err) => {
            reject(err);
        });
    });
});
exports.updateUnits = updateUnits;
const updateUnitsStatus = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.UnitsModel.findOneAndUpdate({
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
exports.updateUnitsStatus = updateUnitsStatus;
