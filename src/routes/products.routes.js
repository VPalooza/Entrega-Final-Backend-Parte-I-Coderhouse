import express from "express";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";

const router = express.Router();

// Obtener la ruta al directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.resolve(__dirname, "../datos/products.json");

// Verificar si el archivo existe antes de leerlo
if (fs.existsSync(pathToFile)) {
    // Leer el archivo JSON si existe
    const products = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

    // Operaciones CRUD (POST, PUT, DELETE) para productos

    // Obtener todos los productos
    router.get("/", (req, res) => {
        res.json(products);
    });

    // Agregar un nuevo producto
    router.post("/", (req, res) => {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "⛔ ¡Son obligatorios todos los campos!" });
        }

        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || [],
        };

        products.push(newProduct);
        fs.writeFileSync(pathToFile, JSON.stringify(products, null, "\t"));
        res.json(products);
    });

    // Actualizar un producto por su id
    router.put("/:pid", (req, res) => {
        const { pid } = req.params;
        const { title, description, code, price, stock, category } = req.body;

        const productIndex = products.findIndex((product) => product.id == pid);

        if (productIndex === -1) {
            return res.status(404).json({ error: "⛔ El producto con el id solicitado no se encuentra" });
        }

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "⛔ ¡Son obligatorios todos los campos!" });
        }

        products[productIndex] = {
            ...products[productIndex],
            title,
            description,
            code,
            price,
            stock,
            category,
        };

        fs.writeFileSync(pathToFile, JSON.stringify(products, null, "\t"));
        res.json(products[productIndex]);
    });

    // Eliminar un producto por su id
    router.delete("/:pid", (req, res) => {
        const { pid } = req.params;
        const productIndex = products.findIndex((product) => product.id == pid);

        if (productIndex === -1) {
            return res.status(404).json({ error: "⛔ El producto con el id solicitado no se encuentra" });
        }

        const deletedProduct = products.splice(productIndex, 1);
        fs.writeFileSync(pathToFile, JSON.stringify(products, null, "\t"));
        res.json(deletedProduct);
    });

} else {
    console.error(`Error: El archivo ${pathToFile} no existe.`);
    //Error en consola en caso de no existir el json
}

export default router;
