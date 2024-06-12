const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller")

//Từ controller gọi đến hàm index
router.get("/products", controller.index);

router.get("/products/:slug", controller.detail);

module.exports = router;