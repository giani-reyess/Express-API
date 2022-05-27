const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

    // Create a new customer with its new user
    async create(data) {
        const newCustomer = await models.Customer.create(data, {
            include: ['user']
        })
        return newCustomer
    }

    // Get every customer in DB and bring its user data too
    async find() {
        const getAllCustomers = await models.Customer.findAll({
            include: ['user']
        })
        return getAllCustomers
    }

    // Get one customer by its id
    async findOne(id) {
        const customerId = await models.Customer.findByPk(id)
        if (!customerId) {
            throw boom.notFound('customer not found')
        }
        return customerId
    }

    // Update one customer by its id
    async update(id, changes) {
        const customerId = await this.findOne(id)
        const response = await customerId.update(changes)
        return response
    }

    // Delete one customer by its id
    async delete(id) {
        const customerId = await this.findOne(id)
        await customerId.destroy()
        return { rta: true }
    }

}

module.exports = CustomerService
