import { Request, Response } from 'express';
import { IProduct, Product } from '../models/product';
import HttpStatusCode from '../util/HttpStatusCode';

export class ProductController {

    public async getProducts(req: Request, res: Response): Promise<void> {
      try {
        const products = await Product.find();
        res.status(HttpStatusCode.OK).json({ products });
      } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          timestamp: Date.now(),
          error: error.toString()
        });
      }
    }

    public async getProduct(req: Request, res: Response): Promise<void> {
       try {
         const product = await Product.findOne({ id: req.params.id });
         if (product === null) {
           res.sendStatus(HttpStatusCode.NOT_FOUND);
         } else {
           res.status(HttpStatusCode.OK).json(product);
         }
       } catch (error) {
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
           timestamp: Date.now(),
           error: error.toString()
         });
       }
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
      try {
        const newProduct: IProduct = new Product(req.body);
        const product = await Product.findOne({ id: req.body.id });
        if (product === null) {
          const result = await newProduct.save();
          if (result === null) {
            res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
          } else {
            res.status(HttpStatusCode.CREATED).json({ data: result });
          }
        } else {
          res.sendStatus(HttpStatusCode.UNPROCESSABLE_ENTITY);
        }
      } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          timestamp: Date.now(),
          error: error.toString()
        });
      }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
     try {
       const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body);
       if (product === null) {
         res.sendStatus(HttpStatusCode.NOT_FOUND);
       } else {
         const updatedProduct = { productId: req.params.id, ...req.body };
         res.json({ status: res.status, data: updatedProduct });
       }
     } catch (error) {
       res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
         timestamp: Date.now(),
         error: error.toString()
       });
     }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
       try {
         const product = await Product.findOneAndDelete({ id: req.params.id });
         if (product === null) {
           res.sendStatus(HttpStatusCode.NOT_FOUND);
         } else {
           res.status(HttpStatusCode.OK).json({ response: 'Product deleted Successfully' });
         }
       } catch (error) {
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
           timestamp: Date.now(),
           error: error.toString()
         });
       }
    }
}
