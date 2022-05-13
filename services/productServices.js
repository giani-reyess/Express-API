const faker = require('faker')
const boom = require('@hapi/boom')
const pool = require('../libs/postrges')

class ProductServices {

    constructor() {
        this.products = []
        this.generateData()
        this.pool = pool
        this.pool.on('error', (err) => console.error(err))
    }

    // Generate fake data to use the other methods
    generateData() {
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.productName(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            })
        }
    }

    async create(data) {
        const item = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(item)
        return item
    }

    async find() {
        const query = 'SELECT * FROM tasks'
        const response = await this.pool.query(query)
        return response.rows
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id)
        if (!product) {
            throw boom.notFound('product not found')
        }
        if (product.isBlock) {
            throw boom.conflict('product is block')
        }
        return product
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index]
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw new Error('Product not found')
        }
        this.products.splice(index, 1)
        return { id }
    }
}

module.exports = ProductServices
