const { Model, DataTypes, Sequelize } = require('sequelize')

const PRODUCT_TABLE = 'product'

// Table shape
const ProductSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: true,
        type: DataTypes.DECIMAL(2),
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.DECIMAL(5, 2),
    },
}

class Product extends Model {
    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }