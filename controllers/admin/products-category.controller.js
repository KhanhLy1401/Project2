const ProductsCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system");
const Product = require("../../models/product.model");
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    const records = await ProductsCategory.find(find);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create"), {
        pageTitle: "Tạo danh mục sản phẩm"
    }
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res)=> {
    if(req.body.position ==""){
        const count = await ProductsCategory.countDocuments();
        req.body.position=count+1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductsCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}