'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../model/productModel')

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
    },

    async down(queryInterface) {
        await queryInterface.dropTbale(PRODUCT_TABLE, ProductSchema)
    }
};
