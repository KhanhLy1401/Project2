const categoryMiddleware = require("../../middlewares/client/category.middleware")

//Lấy biến app từ index.js truyền sang
const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
module.exports = (app) => {
    app.use(categoryMiddleware.category);

    app.use("/", homeRoutes);

    app.use("/", productRoutes);
}