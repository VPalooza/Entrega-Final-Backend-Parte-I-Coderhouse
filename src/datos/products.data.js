const yup = require('yup');
const productScheme = yup.object().shape({
    'title': yup.string().required(),
    'description': yup.string().required(),
    'code': yup.string().required(),
    'price': yup.number().required(),
    'stock': yup.number().required(),
    'category': yup.string(),
    'thumbnails': yup.string(),
    "available": yup.boolean()
}).strict().noUnknown(true, (unknownField) => `Unknown field: ${unknownField.unknown} is not allowed`);

module.exports = productScheme;