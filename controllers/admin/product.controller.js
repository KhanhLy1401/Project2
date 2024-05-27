// [GET]/admin/product

// import model vào 
const Product = require("../../models/product.model")


module.exports.index = async(req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "",
            class: ""
        }
    ]

    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
        
    }

    let find = {
        deleted: false
    }


    // nối chuỗi
    if (req.query.status) {
        find.status = req.query.status;
    }

    let keyword = "";
    if (req.query.keyword) {
        keyword=req.query.keyword;

        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItems: 4
    }

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
    
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/(objectPagination.limitItems));
    objectPagination.totalPage = totalPage;
    // End pagination

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.render("admin/pages/products/index", {
        pageTitle: "Trang Sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: objectPagination
    });
   
}