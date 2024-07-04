const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema(
    {  
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
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

const Account = mongoose.model('Account', accountSchema, "accounts")
module.exports = Account

// token là string random giống id là duy nhất chỉ có tài khoản nào có mới đc
// id là duy nhất công khai, token thì không công khai