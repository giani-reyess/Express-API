const { models } = require('../libs/sequelize')
const boom = require("@hapi/boom")

class CategoryService {

    async create(data) {
        const newCategory = await models.Category.create(data)
        return newCategory
    }

    async find() {
        const findCategories = await models.Category.findAll()
        return findCategories
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id, {
            include: ['products']
        })
        if (!category) {
            boom.notFound('user not found')
        }
        return category
    }

    async update(id, changes) {
        const categoryId = await models.Category.findByPk(id)
        const updateCategory = await categoryId.update(changes)
        return updateCategory
    }

    async delete(id) {
        const category = await models.Category.findByPk(id)
        await category.destroy()
        return { id }
    }
}

module.exports = CategoryService
