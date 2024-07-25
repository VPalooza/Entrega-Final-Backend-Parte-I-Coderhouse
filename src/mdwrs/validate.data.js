const yup = require("yup");

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.inner.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            res.status(400).json({ errors });
        }
    };
};

module.exports = validate;
