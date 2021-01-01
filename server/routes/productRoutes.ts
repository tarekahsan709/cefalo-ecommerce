import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { isAuthenticate } from '../auth/authService';


export class ProductRoutes {

    public router: Router;
    public productController: ProductController = new ProductController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', isAuthenticate, this.productController.getProducts);
        this.router.get('/:id', isAuthenticate, this.productController.getProduct);

        this.router.post('/', isAuthenticate, this.productController.createProduct);
        this.router.put('/:id', isAuthenticate, this.productController.updateProduct);
        this.router.delete('/:id', isAuthenticate, this.productController.deleteProduct);
    }
}
