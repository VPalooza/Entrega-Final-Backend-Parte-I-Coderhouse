const Cart = require("../schema/cart.scheme");
const Product = require("../schema/product.schema");

class CartRepository {
    async createCart(cartData) {
        try {
            const createdCart = await Cart.create(cartData);
            return createdCart;
        } catch (error) {
            throw error;
        }
    }

    async findCartById(id) {
        try {
            const cart = await Cart.findById(id)
                .populate("products._id")
                .exec();
            return cart;
        } catch (error) {
            return error;
        }
    }

    async addToCart(cart, products) {
        try {
            cart.products = products;
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateCart(cart) {
        try {
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async removeFromCart(userId, productId) {
        try {
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                throw new Error("Cart not found");
            }

            cart.products = Cart.products.filter(
                (item) => item.productId.toString() !== productId.toString()
            );
            cart.updatedAt = Date.now();
            await cart.save();

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async clearCart(userId) {
        try {
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                throw new Error("Cart not found");
            }

            cart.products = [];
            cart.updatedAt = Date.now();
            await cart.save();

            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartRepository;
