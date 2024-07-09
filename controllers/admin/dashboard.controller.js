const Product = require("../../models/product.model")
const Account = require("../../models/account.model")
const User = require("../../models/user.model")
const ProductsCategory = require("../../models/products-category.model")
const Order = require("../../models/order.model")
const productsHelper = require("../../helpers/products")

// [GET]/admin/this.dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        order: {
            total: 0,
        },
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

    statistic.order.total = await Order.countDocuments({
    });

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

// [GET]/admin/dashboard/order
module.exports.dashboardOrder = async (req, res) => {
    const orders = await Order.find({});
    for(const order of orders) {
        order.totalPrice = 0;
        for(const product of order.products) {
            const productInfo = await Product.findOne({
                _id: product.product_id
            }).select("title thumbnail")
            product.productInfo=productInfo;
            product.priceNew = productsHelper.priceNewProducts2(product);
            product.totalPrice = product.priceNew * product.quantity;
            order.totalPrice += product.totalPrice
        }
        
    }
    
    res.render("admin/pages/dashboard/order", {
        pageTitle: "Đơn đặt hàng",

        order: orders
    })
}