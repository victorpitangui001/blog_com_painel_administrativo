const express = require("express");
const router = express.Router();
const CategoriesController = require("./CategorieModel");
const slugify = require('slugify');

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        CategoriesController.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect('/admin/categories/new');
    }
});

router.get("/admin/categories", (req, res) => {
    CategoriesController.findAll().then(categories => {
        res.render("admin/categories/index", { categories: categories });
    });

});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            CategoriesController.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            })
        } else {
            res.redirect("/admin/categories");
        }
    } else {
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    CategoriesController.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", { category: category })
        } else {
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories")
    });
});

router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    CategoriesController.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    })
});

module.exports = router