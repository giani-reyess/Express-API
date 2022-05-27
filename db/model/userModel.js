const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

// Table shape
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW

    }
}

// API to interact with the db
class User extends Model {

    // A user can only hold one customer (1-User: 1-Customer)
    static associate(models) {
        this.hasOne(models.Customer, {
            as: 'customer',
            foreignKey: 'userId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }
