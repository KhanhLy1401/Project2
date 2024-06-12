const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({dest: "./public/uploads/"})


const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validate/admin/product.validate")
// khi /product thì sẽ gọi đến controller product.controller ở admin
router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'),
    validate.createPost, 
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch);

module.exports = router;