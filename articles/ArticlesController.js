const express = require("express");
const router = express.Router();
const CategorieModel = require("../categories/CategorieModel");

router.get("/articles", (req, res) => {
    res.send("rota de artigos");
});

router.get("/admin/articles/new", (req, res) => {
    CategorieModel.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories });
    })
    .catch(error => {
        console.error("Erro ao buscar categorias:", error);
        res.render("admin/articles/new", { categories: [] }); // Renderiza com um array vazio em caso de erro
    });
});

module.exports = router;
