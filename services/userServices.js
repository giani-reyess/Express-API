const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
    constructor() {}

    async create(data) {
        const newUser = await models.User.create(data)
        return newUser
    }

    async find() {
        const response = await models.User.findAll();
        return response;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id)
        if (!user) {
            boom.notFound('user not found')
        }
        return user
    }

    async update(id, changes) {
        const userId = await models.User.findByPk(id)
        const updateUser = await userId.update(changes)
        return updateUser
    }

    async delete(id) {
        const user = await models.User.findByPk(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UserService;
