const bodySchema = require("../datos/cart.data");
const { CartService } = require("../managers/cart.service");
const ResponseHandler = require("../tools/response");
const validate = require("../mdwrs/validate.data");
// Función para obtener un carrito por ID
const getCartById = async (req, res) => {
    try {
        const cartService = new CartService();
        const data = await cartService.getAllCartById(req.params.id);
        if (!data) {
            return ResponseHandler.notFound(res, "This id doesn´t exist");
        }
        return ResponseHandler.success(res, data);
    } catch (error) {
        return ResponseHandler.internalError(res, error);
    }
};

// Función para crear un nuevo carrito
const createCart = async (req, res) => {
    try {
        const cartService = new CartService();
        const data = await cartService.createCart(req.body);
        if (data.error) {
            return ResponseHandler.notFound(res, data.message);
        }
        return ResponseHandler.successCreated(
            res,
            data,
            "The cart was saved successfully"
        );
    } catch (error) {
        console.log("controller", error);
        return ResponseHandler.internalError(res);
    }
};

// Función para agregar un producto a un carrito específico
const addProductToCart = async (req, res) => {
    try {
        const body = req.body;
        const cartService = new CartService();
        const data = await cartService.addToCart(req.params.cid, body);
        if (data.error) {
            return ResponseHandler.notFound(res, data.mss);
        }
        return ResponseHandler.successCreated(res, data, data.message);
    } catch (error) {
        return ResponseHandler.internalError(res, "error");
    }
};

const updateCart = async (req, res) => {
    try {
        const body = req.body;
        const cartService = new CartService();
        const data = await cartService.updateCartProduct(
            req.params.cid,
            req.params.pid,
            body
        );
        if (data.error) {
            return ResponseHandler.notFound(res, data.mss);
        }
        return ResponseHandler.successCreated(res, data, data.message);
    } catch (error) {
        return ResponseHandler.internalError(res, "error");
    }
};

const deleteProductOfCart = async (req, res) => {
    try {
        const cartService = new CartService();
        const data = await cartService.deleteProductById(
            req.params.cid,
            req.params.pid
        );
        if (data.error) {
            return ResponseHandler.notFound(res, data.mss);
        }
        return ResponseHandler.successCreated(res, data, data.message);
    } catch (error) {
        return ResponseHandler.internalError(res, "error");
    }
};
const cleaningCart = async (req, res) => {
    try {
        const body = req.body;
        const cartService = new CartService();
        const data = await cartService.cleanCart(
            req.params.cid,
            req.params.pid
        );
        if (data.error) {
            return ResponseHandler.notFound(res, data.mss);
        }
        return ResponseHandler.successCreated(res, data, data.message);
    } catch (error) {
        return ResponseHandler.internalError(res, "error");
    }
};

module.exports = {
    getCartById,
    createCart,
    addProductToCart,
    updateCart,
    deleteProductOfCart,
    cleaningCart,
    validate: validate(bodySchema),
};
