const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

// khi /product thì sẽ gọi đến controller product.controller ở admin
router.get("/", controller.index)

module.exports = router;