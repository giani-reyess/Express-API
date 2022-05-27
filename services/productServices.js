const { models } = require('../libs/sequelize')
const boom = require("@hapi/boom")

class ProductServices {
    // Create new product
    async create(data) {
        const newProduct = await models.Product.create(data, {
            include: ['category']
        })
        return newProduct
    }

    // Get all the products
    async find() {
        const findProduct = await models.Product.findAll({
            include: ['category']
        })
        return findProduct
    }

    // Get one product by id
    async findOne(id) {
        const product = await models.Product.findByPk(id)
        if (!product) {
            boom.notFound('user not found')
        }
        return product
    }

    // Update one product by id
    async update(id, changes) {
        const productId = await models.Product.findByPk(id)
        const updateProduct = await productId.update(changes)
        return updateProduct
    }

    // Delete one product by id
    async delete(id) {
        const product = await models.Product.findByPk(id)
        await product.destroy()
        return { id }
    }
}

module.exports = ProductServices
