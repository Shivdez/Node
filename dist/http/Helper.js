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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = exports.objectToStringID = exports.verifyJWTToken = exports.createJWTToken = exports.comparePasswords = exports.hashPassword = exports.success = exports.error = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("./Models/Admin/User");
const mongoose_1 = require("mongoose");
const PanelPermission_1 = require("./Models/Admin/PanelPermission");
const SocateController_1 = require("./Controlles/Admin/SocateController");
const error = (response) => {
    response.resp.status(response.code ? response.code : 400).send({
        error: true,
        data: response.data,
        message: response.message,
        // permissions: respons.resp.permissions,
    });
};
exports.error = error;
const success = (response) => {
    if (response.socket) {
        (0, SocateController_1.socket)({
            path: response.socket.path,
            type: response.socket.type,
            data: response.socket.data,
        });
    }
    response.resp.status(200).send({
        error: false,
        data: response.data ? response.data : [],
        message: response.message,
        permissions: response.resp.permissions,
    });
};
exports.success = success;
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcryptjs_1.default.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hash);
});
exports.comparePasswords = comparePasswords;
const expiresIn = '1h';
const createJWTToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'admin123');
});
exports.createJWTToken = createJWTToken;
const verifyJWTToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'admin123');
    }
    catch (error) {
        return 'Invalid token';
    }
});
exports.verifyJWTToken = verifyJWTToken;
const objectToStringID = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let objectId = new mongoose_1.Types.ObjectId(user_id);
    return yield objectId.toString();
});
exports.objectToStringID = objectToStringID;
const userData = (user_id) => {
    return new Promise((resolve, reject) => {
        User_1.UserModel.aggregate()
            .match({
            _id: new mongoose_1.Types.ObjectId(user_id),
        })
            .lookup({
            from: 'user_datas',
            localField: '_id',
            foreignField: 'user_id',
            as: 'user_datas',
        })
            .unwind('user_datas')
            .lookup({
            from: 'panel_permissions',
            localField: '_id',
            foreignField: 'user_id',
            as: 'panel_permissions',
        })
            .unwind('panel_permissions')
            .then((user) => {
            const image = 'https://icon2.cleanpng.com/20180402/oaq/kisspng-computer-icons-avatar-login-user-avatar-5ac207e6760664.4895544815226654464834.jpg';
            if (user[0].status) {
                if (user[0].type === -1) {
                    PanelPermission_1.PanelPermissionModel.aggregate()
                        .match({
                        user_id: new mongoose_1.Types.ObjectId(user_id),
                    })
                        .lookup({
                        from: 'user_permissions',
                        localField: '_id',
                        foreignField: 'panel_permission_id',
                        as: 'user_permissions',
                    })
                        .unwind('user_permissions')
                        .lookup({
                        from: 'panels',
                        localField: 'panel_id',
                        foreignField: '_id',
                        as: 'panels',
                    })
                        .unwind('panels')
                        .lookup({
                        from: 'roles',
                        localField: 'user_permissions.role_id',
                        foreignField: '_id',
                        as: 'roles',
                    })
                        .unwind('roles')
                        .lookup({
                        from: 'system_user_types',
                        localField: 'roles.type_id',
                        foreignField: '_id',
                        as: 'types',
                    })
                        .unwind('types')
                        .then((roles) => {
                        var permissions = [];
                        permissions = JSON.parse(roles[0].roles.permissions);
                        let custom_permission = JSON.parse(roles[0].user_permissions.custom_permissions);
                        for (let index = 0; index < custom_permission.length; index++) {
                            const element = custom_permission[index];
                            permissions.push(element);
                        }
                        var userData = {
                            _id: user[0]._id,
                            name: user[0].user_datas.name,
                            image: image,
                            email: user[0].email,
                            phone: user[0].phone,
                            token: user[0].token,
                            type: user[0].type,
                            status: user[0].status,
                            member_code: user[0].user_datas.member_code,
                            panel_id: roles[0].panels._id,
                            panel_name: roles[0].panels.name,
                            panel_lavel: roles[0].panels.lavel,
                            permissions: JSON.stringify(permissions),
                            permission_name: roles[0].types.name,
                            permission: roles,
                        };
                        resolve(userData);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                else {
                    PanelPermission_1.PanelPermissionModel.aggregate()
                        .match({
                        user_id: new mongoose_1.Types.ObjectId(user_id),
                    })
                        .lookup({
                        from: 'user_permissions',
                        localField: '_id',
                        foreignField: 'panel_permission_id',
                        as: 'user_permissions',
                    })
                        .unwind('user_permissions')
                        .lookup({
                        from: 'panels',
                        localField: 'panel_id',
                        foreignField: '_id',
                        as: 'panels',
                    })
                        .unwind('panels')
                        .lookup({
                        from: 'roles',
                        localField: 'user_permissions.role_id',
                        foreignField: '_id',
                        as: 'roles',
                    })
                        .unwind('roles')
                        .lookup({
                        from: 'types',
                        localField: 'roles.type_id',
                        foreignField: '_id',
                        as: 'types',
                    })
                        .unwind('types')
                        .then((roles) => {
                        var permissions = [];
                        permissions = JSON.parse(roles[0].roles.permissions);
                        let custom_permission = JSON.parse(roles[0].user_permissions.custom_permissions);
                        for (let index = 0; index < custom_permission.length; index++) {
                            const element = custom_permission[index];
                            permissions.push(element);
                        }
                        var userData = {
                            _id: user[0]._id,
                            name: user[0].user_datas.name,
                            image: image,
                            email: user[0].email,
                            phone: user[0].phone,
                            token: user[0].token,
                            type: user[0].type,
                            status: user[0].status,
                            member_code: user[0].user_datas.member_code,
                            panel_id: roles[0].panels._id,
                            panel_name: roles[0].panels.name,
                            panel_lavel: roles[0].panels.lavel,
                            permissions: JSON.stringify(permissions),
                            permission_name: roles[0].types.name,
                            permission: roles,
                        };
                        resolve(userData);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            }
            else {
                reject({
                    message: 'You are not active now. please contact to admin',
                });
            }
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.userData = userData;
