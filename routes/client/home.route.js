const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/home.controller")

//Từ controller gọi đến hàm index
router.get("/", controller.index);
module.exports = router;