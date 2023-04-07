import express from 'express';
import { addBrandController } from '../Controllers/brandController';

const brandRouter = express.Router();

// ADD BRAND
brandRouter.route('/add-brand').delete(addBrandController);

export default brandRouter;
