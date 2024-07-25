const yup = require("yup");
const productSchema = yup
    .object()
    .shape({
        id: yup.string().required(),
        quantity: yup.number().required(),
    })
    .strict()
    .noUnknown(
        true,
        (unknownField) =>
            `Unknown field: ${unknownField.unknown} is not allowed`
    );

const bodySchema = yup
    .object()
    .shape({
        products: yup.array().of(productSchema).required(),
    })
    .strict()
    .noUnknown(
        true,
        (unknownField) =>
            `Unknown field: ${unknownField.unknown} is not allowed`
    );

module.exports = bodySchema;
