const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom');

class OrderService {

    async create(data) {
        const newUser = await models.Order.create(data)
        return newUser
    }

    async find() {
        const response = await models.Order.findAll();
        return response;
    }

    async findOne(id) {
        const user = await models.Order.findByPk(id)
        if (!user) {
            boom.notFound('user not found')
        }
        return user
    }

    async update(id, changes) {
        const userId = await models.Order.findByPk(id)
        const updateUser = await userId.update(changes)
        return updateUser
    }

    async delete(id) {
        const user = await models.Order.findByPk(id)
        await user.destroy()
        return { id }
    }

}

module.exports = OrderService;
