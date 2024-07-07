// [GET]/products
const ProductCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")
const  createTreeHelper = require("../../helpers/createTree")
const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")

module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const newProducts = productsHelper.priceNewProducts(products);


    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: newProducts
    });

}

//[GET] /products/:slug
module.exports.category = async(req, res) => {
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false,
        status: "active"
    });

    // const getSubCategory = async (parentId) => {
    //     const subs = await ProductCategory.find({
    //         parent_id: parentId,
    //         status: "active",
    //         deleted: false
    //     });

    //     let allSub = [...subs];
    //     for (const sub of subs) {
    //         const childs = await getSubCategory(sub.id);
    //         allSub = allSub.concat(childs);
    //     }

    //     return allSub;
    // }

    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    
    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        product_category_id: {$in: [category.id, ...listSubCategoryId]},
        deleted: false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    });
}

