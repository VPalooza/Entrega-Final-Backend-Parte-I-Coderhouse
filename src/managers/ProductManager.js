import __dirname from "../tools/dirname.js";
import fs from "fs";
import path from "path";

class ProductManager {
    constructor(filePath) {
        this.filePath = path.resolve(__dirname, filePath);
        if (fs.existsSync(this.filePath)) {
            try {
                this.products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            } catch (error) {
                this.products = [];
            }
        } else {
            this.products = [];
        }
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) return null;
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

export const productManager = new ProductManager("../datos/products.json");
