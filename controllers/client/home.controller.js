const ProductsCategory = require("../../models/products-category.model")
const  createTreeHelper = require("../../helpers/createTree")

// [GET]/

module.exports.index = async (req, res) => {
    const productsCategory = await ProductsCategory.find({
        deleted: false
    });

    const newProductsCategory = createTreeHelper.tree(productsCategory);

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        layoutProductsCategory: newProductsCategory
    });
}