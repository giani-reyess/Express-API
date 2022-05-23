const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
    constructor() {}

    // Create new user
    async create(data) {
        const newUser = await models.User.create(data)
        return newUser
    }

    // Get all the users along its costumers
    async find() {
        const users = await models.User.findAll({
            include: ['customer']
        });
        return users
    }

    // Get one user by id
    async findOne(id) {
        const user = await models.User.findByPk(id)
        if (!user) {
            boom.notFound('user not found')
        }
        return user
    }

    // Update one user by id
    async update(id, changes) {
        const userId = await models.User.findByPk(id)
        const updateUser = await userId.update(changes)
        return updateUser
    }

    // Delete one user by id
    async delete(id) {
        const user = await models.User.findByPk(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UserService;
