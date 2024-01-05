const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conn = require("./db/conn");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require('./articles/ArticleModel');
const Category = require('./categories/CategorieModel');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

conn
.authenticate()
.then(() => {
    console.log("Conexão feita com sucesso!")
}).catch((error) => {
    console.log(error)
});

app.use('/', categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
    res.render("index")
})


app.listen(3000, () => {
    console.log("O servidor está rodando!")
});