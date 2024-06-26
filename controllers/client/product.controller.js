// [GET]/products
const Product = require("../../models/product.model")

module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    products.forEach(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(2);
    })

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });

}

//[GET] /products/:slug
module.exports.detail = async(req, res) => {

    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        };
    
        const product = await Product.findOne(find);
    
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch(error){
        res.redirect(`/products`);
    }
}