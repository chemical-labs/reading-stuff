const { DataTypes, Models, Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USERS, process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
})

const Role = sequelize.define('role', {
    name: DataTypes.TEXT,
    level: DataTypes.TEXT
})

Role.sync()

module.exports = Role;
