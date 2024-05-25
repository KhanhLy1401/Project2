const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller")

//Từ controller gọi đến hàm index
router.get("/products", controller.index);
module.exports = router;