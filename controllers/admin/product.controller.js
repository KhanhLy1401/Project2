// [GET]/admin/product

// import model vào 
const Product = require("../../models/product.model")

const paginationHelper = require("../../helpers/pagination")
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
            status: "inactive",
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
   
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        }, 
        req.query,
        countProducts
    );
  
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

// [PATCH]/admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne ({_id: id}, {status: status})
    
    // res.send(`${status} - ${id}`);
    res.redirect('back');
}