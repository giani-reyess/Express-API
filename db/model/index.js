/*
  Here we gonna initialize our Models and Schemas
*/

// Import your Schemas and Models
const { UserSchema, User } = require('./userModel')
const { ProductSchema, Product } = require('./productModel')
const { CustomerSchema, Customer } = require('./customerModel')

function setUpModels(sequelize) {
    // Model initialization here
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    Customer.init(CustomerSchema, Customer.config(sequelize))

    // Model associations here
    User.associate(sequelize.models)
    Customer.associate(sequelize.models)
}

module.exports = setUpModels
