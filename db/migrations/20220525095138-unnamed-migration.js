'use strict';

const { OrderSchema, ORDER_TABLE } = require('./../model/orderModel')

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(ORDER_TABLE, OrderSchema)
    },

    async down(queryInterface) {
        await queryInterface.dropTable(ORDER_TABLE, OrderSchema)
    }
};
