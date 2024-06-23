const Role = require("../../models/role.model");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find)
   
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}