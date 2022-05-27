const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

// Table shape
const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
}

// API for interacting with the db
class Category extends Model {

    // A category can hold many products (M-Categories: 1-Product)
    static associate(models) {
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId' // <-- This column bind both tables
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
