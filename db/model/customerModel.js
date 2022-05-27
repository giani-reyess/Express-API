const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./userModel')

const CUSTOMER_TABLE = 'customers'

// Table shape
const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

// API to interact with the db
class Customer extends Model {

    static associate(models) {

        // A customer can only hold one user (1-User: 1-Customer)
        this.belongsTo(models.User, { as: 'user' })

        // Many customer has many orders (M-Customer: M-Order)
        this.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'customerId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE }
