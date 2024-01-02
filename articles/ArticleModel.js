const { DataTypes } = require("sequelize");
const connection = require("../db/conn");
const CategorieModel = require('../categories/CategorieModel');
const Category = require("../categories/CategorieModel");

const Article = connection.define('articles', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
Category.hasMany(Article); // Uma categoria tem muitos artigos
Article.belongsTo(CategorieModel); //Um artigo pertence a uma categoria

module.exports = Article