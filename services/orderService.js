// const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

    // Create new order
    async create(data) {
        const newOrder = await models.Order.create(data);
        return newOrder;
    }

    // Add orderId, productId and amount of the ordered product.
    // It's the cart. You're just adding a product to the cart.
    async addOrderedItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async find() {
        const orders = await models.Order.findAll({
            include: [{
                    association: 'customer',
                    include: ['user']
                },
                'items'
            ]
        })
        return orders
    }

    // Get one order by id
    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [{
                    association: 'customer',
                    include: ['user']
                },
                'items'
            ]
        });
        return order;
    }

    // Update one order by id
    async update(id, changes) {
        const order = await models.Order.findByPk(id)
        const updateOrder = await order.update(changes)
        return updateOrder
    }

    // Delete one order by id
    async delete(id) {
        const order = await models.Order.findByPk(id)
        await order.destroy()
        return { id }
    }

}

module.exports = OrderService;
