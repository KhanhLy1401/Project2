const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
    {  
        user_id: String,
        products: [
            {
            product_id: String,
            quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', cartSchema, "carts")
module.exports = Cart

// token là string random giống id là duy nhất chỉ có tài khoản nào có mới đc
// id là duy nhất công khai, token thì không công khai