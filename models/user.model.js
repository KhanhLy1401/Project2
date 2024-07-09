const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const userSchema = new mongoose.Schema(
    {  
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
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

const User = mongoose.model('User', userSchema, "users")
module.exports = User

// token là string random giống id là duy nhất chỉ có tài khoản nào có mới đc
// id là duy nhất công khai, token thì không công khai