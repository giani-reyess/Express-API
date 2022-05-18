const { models } = require('../libs/sequelize')
const boom = require("@hapi/boom")

class ProductServices {

    async create(data) {
        const newProduct = await models.Product.create(data)
        return newProduct
    }

    async find() {
        const findProduct = await models.Product.findAll()
        return findProduct
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id)
        if (!product) {
            boom.notFound('user not found')
        }
        return product
    }

    async update(id, changes) {
        const productId = await models.Product.findByPk(id)
        const updateProduct = await productId.update(changes)
        return updateProduct
    }

    async delete(id) {
        const product = await models.Product.findByPk(id)
        await product.destroy()
        return { id }
    }
}

module.exports = ProductServices
