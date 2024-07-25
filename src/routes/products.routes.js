const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.validate, productController.createProduct);

router.put("/:id", productController.validate, productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
