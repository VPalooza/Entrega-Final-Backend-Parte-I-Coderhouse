import { Router } from "express";
import { cartManager } from "../managers/CartManager.js";

const router = Router();

// Ruta para crear un carrito
router.post("/", async (req, res) => {
    try {
        await cartManager.createCart();
        res.status(201).json({ message: "Se creo el carrito correctamente" });
    } catch (error) {
        res.status(400).json({
            error: `No se pudo crear el carrito: ${error}`,
        });
    }
});

// Ruta para obtener un carrito por id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartManager.getCart(Number(id));

        if (!cart) {
            return res.status(404).json({ error: "El carrito no existe" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({
            error: `No se pudo obtener el carrito: ${error}`,
        });
    }
});

// Ruta para agregar un producto al carrito
router.post("/:id/product/:productId", async (req, res) => {
    const { id, productId } = req.params;

    try {
        await cartManager.addProductToCart(Number(id), Number(productId));
        res.status(201).json({ message: "Se agrego el producto al carrito" });
    } catch (error) {
        res.status(400).json({
            error: `No se pudo agregar el producto al carrito: ${error}`,
        });
    }
});

// Nueva ruta para obtener todos los carritos
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();

        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({
            error: `No se pudieron obtener los carritos: ${error}`,
        });
    }
});

export default router;
