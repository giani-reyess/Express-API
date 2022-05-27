const { Model, DataTypes, Sequelize } = require('sequelize')
const { CATEGORY_TABLE } = require('./categoryModel')
const PRODUCT_TABLE = 'products'

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
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.DECIMAL(5, 2),
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

// API to interact with the db
class Product extends Model {

    // A product can belong to many categories (M-Categories: 1-Product)
    static associate(models) {
        this.belongsTo(models.Category, { as: 'category' })
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
