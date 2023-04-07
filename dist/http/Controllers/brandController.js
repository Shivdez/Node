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
exports.addBrandController = void 0;
const Brands_1 = require("../Models/Brands");
const addBrandController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const brandDetails = yield req.body;
    console.log('data saved into db', req.body);
    (0, Brands_1.deleteBrand)(brandDetails.id)
        .then(() => res.status(200).json('new brand deleted successfullly!'))
        .catch((err) => console.log(err));
});
exports.addBrandController = addBrandController;
