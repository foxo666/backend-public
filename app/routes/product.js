import { Router } from "express";
import { cProduct, dProduct, gProduct, updateProduct } from "../controller/product.js";

const router = Router();

router.post("/create-product", cProduct);
router.post("/products", cProduct);

router.get("/get-product", gProduct);
router.get("/products", gProduct);

router.delete("/del-product/:id", dProduct);

router.put("/upd-product/:id", updateProduct);

export default router;