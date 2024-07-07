const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/search.controller")

//Từ controller gọi đến hàm index
router.get("/", controller.index);
module.exports = router;