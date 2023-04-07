"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../Controllers/brandController");
const brandRouter = express_1.default.Router();
// ADD BRAND
brandRouter.route('/add-brand').delete(brandController_1.addBrandController);
exports.default = brandRouter;
