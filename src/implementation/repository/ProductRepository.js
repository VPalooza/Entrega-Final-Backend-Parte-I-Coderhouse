const productScheme = require("../../dtos/products.dto");
const Product = require("../schema/product.schema");

class ProductRepository {
    async create(productData) {
        try {
            const product = new Product(productData);
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getAll(filter) {
        try {
            let sortOrder = -1;
            const query = {};
            let page = 1;
            let limit = 10;
            if (filter) {
                page = filter.page;
                limit = filter.limit;
                if (filter.category !== null) {
                    query.category = filter.category;
                }
                if (filter.available !== null) {
                    query.available = filter.available;
                }
                if (filter.sortOrder) {
                    sortOrder = filter.sortOrder;
                }
            }
            const sort = { price: sortOrder };
            const products = await Product.find(query)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const totalProducts = await Product.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            const prevLink = hasPrevPage
                ? `/realtimeproducts?page=${prevPage}&limit=${limit}`
                : null;
            const nextLink = hasNextPage
                ? `/realtimeproducts?page=${nextPage}&limit=${limit}`
                : null;

            return {
                products,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage: page,
                    limit: limit,
                    hasPrevPage,
                    hasNextPage,
                    prevPage,
                    nextPage,
                    prevLink,
                    nextLink,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async getAllData() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getById(_id) {
        try {
            const product = await Product.findById(_id);
            console.log("product", product);
            if (!product) {
                return [];
            }
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(productId, productData) {
        try {
            const product = await Product.findByIdAndUpdate(
                productId,
                productData,
                { new: true, runValidators: true }
            );
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async delete(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findByCode(code) {
        try {
            const product = await Product.findOne({ code });
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductRepository();
