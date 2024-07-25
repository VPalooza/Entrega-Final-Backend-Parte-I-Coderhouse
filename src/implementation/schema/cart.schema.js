const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        products: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
