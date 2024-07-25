const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/:id", cartController.getCartById);
router.post("/", cartController.validate, cartController.createCart);
router.put("/:cid", cartController.addProductToCart);
router.put("/:cid/product/:pid", cartController.updateCart);
router.delete("/:cid/product/:pid", cartController.deleteProductOfCart);
router.delete("/:cid", cartController.cleaningCart);

module.exports = router;
