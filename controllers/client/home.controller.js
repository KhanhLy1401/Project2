const ProductsCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")
const  createTreeHelper = require("../../helpers/createTree")
const productsHelper = require("../../helpers/products")

// [GET]/

module.exports.index = async (req, res) => {
    // const productsCategory = await ProductsCategory.find({
    //     deleted: false
    // });

    // Lấy ra sản phẩm nôi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    })
    // HẾt lấy ra sản phẩm nổi bật
    const newProducts = productsHelper.priceNewProducts(productsFeatured);
    // const newProductsCategory = createTreeHelper.tree(productsCategory);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        // layoutProductsCategory: newProductsCategory
        productsFeatured: newProducts
    });
}