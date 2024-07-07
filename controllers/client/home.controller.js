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


    const newProducts = productsHelper.priceNewProducts1(productsFeatured);
    // const newProductsCategory = createTreeHelper.tree(productsCategory);

    // Hiển thị ra sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"

    }).sort({position: "desc"}).limit(6);

    const newProductsNew = productsHelper.priceNewProducts1(productsNew);
    // Hết Hiển thị ra sản phẩm mới nhất

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        // layoutProductsCategory: newProductsCategory
        productsFeatured: newProducts,
        productsNew: newProductsNew
    });
}