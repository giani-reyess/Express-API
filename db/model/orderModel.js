const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customerModel');

const ORDER_TABLE = 'orders';

// Table shape
const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },

    // Total price of all the items in the cart
    total: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.amount)
                }, 0)
            }
            return 0
        }
    }
}

// API to interact with the db
class Order extends Model {

    static associate(models) {

        // Many orders belongs to many customers (M-Customer: M-Order)
        this.belongsTo(models.Customer, {
            as: 'customer',
        })

        // Many orders can be done with many different products
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct, // <-- Bind both tables in OrderProduct
            foreignKey: 'orderId', // <-- with 'orderId' as PK of order
            otherKey: 'productId' // <-- and 'productId' as PK of product
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
