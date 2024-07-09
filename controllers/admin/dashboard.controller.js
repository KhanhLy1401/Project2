const Product = require("../../models/product.model")
const Account = require("../../models/account.model")
const User = require("../../models/user.model")
const ProductsCategory = require("../../models/products-category.model")
// [GET]/admin/this.dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive:0
        },
        product: {
            total: 0,
            active: 0,
            inactive:0
        },
        account: {
            total: 0,
            active: 0,
            inactive:0
        },
        user: {
            total: 0,
            active: 0,
            inactive:0
        }
    }
    statistic.categoryProduct.total = await ProductsCategory.countDocuments({
        deleted: false
    });
    statistic.categoryProduct.active = await ProductsCategory.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.categoryProduct.inactive = await ProductsCategory.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statistic.categoryProduct.inactive = await ProductsCategory.countDocuments({
        deleted: false,
        status: "inactive"
    });

    statistic.product.total = await Product.countDocuments({
        deleted: false,
    });
    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.account.total = await Account.countDocuments({
        deleted: false,
    });
    statistic.account.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statistic.account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.user.total = await User.countDocuments({
        deleted: false,
    });
    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });
    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}