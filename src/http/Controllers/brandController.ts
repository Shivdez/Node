import { addBrand, deleteBrand } from '../Models/Brands';
import { Request, Response } from 'express';

const addBrandController = async (req: Request, res: Response, next: any) => {
  const brandDetails = await req.body;
  console.log('data saved into db', req.body);

  deleteBrand(brandDetails.id)
    .then(() => res.status(200).json('new brand deleted successfullly!'))
    .catch((err) => console.log(err));
};

export { addBrandController };
