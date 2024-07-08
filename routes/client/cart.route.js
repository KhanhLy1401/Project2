const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart.controller")

//Từ controller gọi đến hàm index
router.post("/add/:productId", controller.addPost);
module.exports = router;