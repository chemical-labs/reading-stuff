const { DataTypes, Models, Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USERS, process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
})

const Books = sequelize.define('books', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    file: DataTypes.TEXT,
    likes: {
        type: DataTypes.INTEGER,
        default: 0
    },
    subscribe: DataTypes.BOOLEAN
})

Books.sync()

module.exports = Books
