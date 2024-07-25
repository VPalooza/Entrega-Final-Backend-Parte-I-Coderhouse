const productScheme = require("../datos/products.data");
const validate = require("../mdwrs/validate.data");
const ResponseHandler = require("../tools/response");
const { ProductService } = require("../managers/products.service");

// Función para obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const sort = req.query.sort || "desc";
        const filters = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortOrder: sort === "asc" ? 1 : -1,
            category: req.query.category || null,
            available: req.query.available || null,
        };

        const data = await ProductService.getAllProducts(filters);
        return ResponseHandler.success(res, data, "List of products");
    } catch (error) {
        console.log("error", error);
        return ResponseHandler.internalError(res);
    }
};

// Función para obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const data = await ProductService.getById(req.params.id);
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        } else {
            return ResponseHandler.success(res, data, "Product");
        }
    } catch (error) {
        return ResponseHandler.internalError(res);
    }
};

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.createProduct(req.body);
        console.log("data", data);
        if (data?.message) {
            return ResponseHandler.badRequest(res, data.message);
        }
        return ResponseHandler.successCreated(res, data, "Product created");
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};

// Función para actualizar un producto por ID
const updateProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.updateProduct(
            req.params.id,
            req.body
        );
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        }
        return ResponseHandler.successCreated(res, data, "Product updated");
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};

// Función para eliminar un producto por ID
const deleteProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const data = await productService.deleteProduct(req.params.id);
        if (data?.message) {
            return ResponseHandler.notFound(res, data.message);
        }
        return ResponseHandler.success(res, data, "Product deleted");
    } catch (error) {
        console.error(error);
        return ResponseHandler.internalServerError(res);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validate: validate(productScheme), // Middleware de validación con esquema definido
};
