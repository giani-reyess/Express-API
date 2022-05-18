const Joi = require('joi')

const id = Joi.string()
const name = Joi.string().min(1).max(100)
const price = Joi.number().integer().min(10)
const date = Joi.date()
const numberRange = Joi.number().max(5)


const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    createdAt: date.required(),
    rating: numberRange.required()

})

const updateProductSchema = Joi.object({
    name: name.required(),
    id: id.required()
})

const getProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema
}
