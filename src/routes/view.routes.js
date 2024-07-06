import { Router } from "express";
import {productManager} from "../managers/ProductManager.js";

const router = Router();


router.get("/", (req, res) => {
    res.render("index", { products: productManager.getProducts() }); // Ejemplo de método getAllProducts() para obtener datos
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

export default router;
