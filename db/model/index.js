/*
  Here we gonna initialize our Models and Schemas
*/

// Import your Schemas and Models
const { UserSchema, User } = require('./userModel')
const { ProductSchema, Product } = require('./productModel')

function setUpModels(sequelize) {
    // Initialize here
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
}

module.exports = setUpModels
