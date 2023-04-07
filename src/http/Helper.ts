import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from './Models/Admin/User';
import { Error, Types } from 'mongoose';
import { UserPermissionModel } from './Models/Admin/UserPermission';
import { PanelPermissionModel } from './Models/Admin/PanelPermission';
import { MyResponse } from './Middleware/Authorization';
import { socket } from './Controlles/Admin/SocateController';

export interface User extends Document {
  email?: String;
  phone?: Number;
  password?: String;
  token: String;
  type?: Number;
  status: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface iSocket {
  path: string;
  type: string;
  data: any;
}

interface iResponse {
  resp: MyResponse;
  data?: any;
  message?: any | null | undefined;
  code?: number | null | undefined;
  socket?: iSocket;
}

export const error = (response: iResponse): void => {
  response.resp.status(response.code ? response.code : 400).send({
    error: true,
    data: response.data,
    message: response.message,
    // permissions: respons.resp.permissions,
  });
};

export const success = (response: iResponse): void => {
  if (response.socket) {
    socket({
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

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const expiresIn = '1h';
export const createJWTToken = async (payload: any) => {
  return await jwt.sign(payload, process.env.JWT_SECRET || 'admin123');
};

export const verifyJWTToken = async (
  token: string
): Promise<object | string> => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET || 'admin123');
  } catch (error) {
    return 'Invalid token';
  }
};

export const objectToStringID = async (
  user_id: Types.ObjectId
): Promise<String> => {
  let objectId = new Types.ObjectId(user_id);
  return await objectId.toString();
};

export const userData = (user_id: any) => {
  return new Promise((resolve, reject) => {
    UserModel.aggregate()
      .match({
        _id: new Types.ObjectId(user_id),
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
      .then((user: any) => {
        const image =
          'https://icon2.cleanpng.com/20180402/oaq/kisspng-computer-icons-avatar-login-user-avatar-5ac207e6760664.4895544815226654464834.jpg';
        if (user[0].status) {
          if (user[0].type === -1) {
            PanelPermissionModel.aggregate()
              .match({
                user_id: new Types.ObjectId(user_id),
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
              .then((roles: any) => {
                var permissions = [];
                permissions = JSON.parse(roles[0].roles.permissions);
                let custom_permission = JSON.parse(
                  roles[0].user_permissions.custom_permissions
                );
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
              .catch((err: Error) => {
                reject(err);
              });
          } else {
            PanelPermissionModel.aggregate()
              .match({
                user_id: new Types.ObjectId(user_id),
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
              .then((roles: any) => {
                var permissions = [];
                permissions = JSON.parse(roles[0].roles.permissions);
                let custom_permission = JSON.parse(
                  roles[0].user_permissions.custom_permissions
                );
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
              .catch((err: Error) => {
                reject(err);
              });
          }
        } else {
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
