import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authenticateJWT } from '../auth/authService';


export class ProductRoutes {

    public router: Router;
    public productController: ProductController = new ProductController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/", this.productController.getProducts);
        this.router.get("/:id", this.productController.getProduct);
        this.router.post("/", authenticateJWT, this.productController.createProduct);
        this.router.put("/:id", authenticateJWT, this.productController.updateProduct);
        this.router.delete("/:id", authenticateJWT, this.productController.deleteProduct);
    }
}
