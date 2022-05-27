'use strict'

const { CategorySchema, CATEGORY_TABLE } = require("../model/categoryModel")

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    },

    async down(queryInterface) {
        await queryInterface.dropTable(CATEGORY_TABLE, CategorySchema)
    }
};
