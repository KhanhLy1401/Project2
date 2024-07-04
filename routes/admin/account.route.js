const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require("../../validate/admin/account.validate")

const upload = multer();

const controller = require("../../controllers/admin/account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);


module.exports = router;