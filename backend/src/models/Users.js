const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USERS, process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
})

const User = sequelize.define('users', {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    photo: {
        type: DataTypes.TEXT,
        default: '/profile/defult.jpg'
    },
    role: {
        type: DataTypes.TEXT,
        default: 'free'
    },
    subscribe: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    expired: {
        type: DataTypes.TEXT,
        default: ''
    }
})


User.sync()

module.exports = User
