const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {  
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps: true
    }
)

const Role = mongoose.model('Product', roleSchema, "role")
module.exports = Role