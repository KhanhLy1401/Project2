// [GET]/products
const ProductCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")

const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")

module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const newProducts = productsHelper.priceNewProducts1(products);


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


    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    
    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        product_category_id: {$in: [category.id, ...listSubCategoryId]},
        deleted: false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts1(products);
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    });
}

//[GET] /products/:slugProduct
module.exports.detail = async(req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        };

        const product = await Product.findOne(find);

        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false
            });

            product.category = category;
        };

        product.priceNew = productsHelper.priceNewProducts2(product);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect("/products");
    }
}