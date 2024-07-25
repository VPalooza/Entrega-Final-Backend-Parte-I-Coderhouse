const fs = require("fs").promises;
const path = require("path");
const filePath = path.resolve("src/datos/products.json");
const { v4: uuidv4 } = require("uuid");
let io;
const ProductRepository = require("../implementation/repository/ProductRepository");

class ProductService {
    constructor() {}

    static initializeSocket(socketIo) {
        io = socketIo;
    }

    async getAll() {
        try {
            const data = await ProductRepository.getAllData();
            return data;
        } catch (error) {
            console.log("error", error);
            return null;
        }
    }
    static async getAllProducts(filters) {
        try {
            const data = await ProductRepository.getAll(filters);
            const { products, pagination } = data;
            return { products, pagination };
        } catch (error) {
            console.log("error", error);
            return null;
        }
    }
    static async getById(id) {
        try {
            const product = await ProductRepository.getById(id);
            if (!product) {
                return [];
            }
            return product;
        } catch (error) {
            console.error(`Error in ProductService.getById(${id}):`, error);
            return `Error in ProductService.getById(${id}):`;
        }
    }

    async createProduct(productData) {
        console.log("created products");
        try {
            const existingProduct = await ProductRepository.findByCode(
                productData.code
            );
            if (existingProduct) {
                return { message: "The code already exists" };
            }

            const createdProduct = await ProductRepository.create(productData);
            await this.getAllProductsSocket();

            return createdProduct;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            // Check if the product exists
            const existingProduct = await ProductRepository.getById(productId);
            if (!existingProduct) {
                return { message: `Product with id ${productId} not found` };
            }

            // Update the product with new data
            const updatedProduct = await ProductRepository.update(
                productId,
                productData
            );
            await this.getAllProductsSocket();

            return updatedProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteProduct(id) {
        console.log("product id a eliminar", id);
        try {
            const data = await fs.readFile(filePath, "utf8");
            let products = JSON.parse(data);

            const index = products.findIndex((product) => product.id === id);
            console.log("index", index);
            if (index !== -1) {
                products = products.filter((e) => e.id !== id);
            } else {
                return { message: `Not found products whit this ${id}` };
            }
            await fs.writeFile(filePath, JSON.stringify(products));
            await this.getAllProductsSocket();
            return id;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllProductsSocket() {
        try {
            const products = await this.getAll();
            if (io) {
                io.emit("productsUpdated", products);
            } else {
                console.error("Socket.io no está inicializado.");
            }
            return products;
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
            throw error;
        }
    }
}
module.exports.ProductService = ProductService;
