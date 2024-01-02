const { DataTypes } = require("sequelize");
const connection = require("../db/conn");

const Category = connection.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category
