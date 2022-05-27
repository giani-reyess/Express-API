/*
  Here we gonna initialize our Models and Schemas
*/

// Import your Schemas and Models
const { UserSchema, User } = require('./userModel')
const { ProductSchema, Product } = require('./productModel')
const { CustomerSchema, Customer } = require('./customerModel')
const { Category, CategorySchema } = require('./categoryModel')
const { Order, OrderSchema } = require('./orderModel')
const { OrderProductSchema, OrderProduct } = require('./../model/order-product')


function setUpModels(sequelize) {

    // Model initialization here
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    Customer.init(CustomerSchema, Customer.config(sequelize))
    Category.init(CategorySchema, Category.config(sequelize))
    Order.init(OrderSchema, Order.config(sequelize))
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

    // Model associations here
    User.associate(sequelize.models)
    Customer.associate(sequelize.models)
    Category.associate(sequelize.models)
    Product.associate(sequelize.models)
    Order.associate(sequelize.models)
}

module.exports = setUpModels
