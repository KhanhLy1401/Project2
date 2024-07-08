const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {  
        // user_id: String,
        cart_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String
        },
        products: {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number,
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema, "orders")
module.exports = Order

// token là string random giống id là duy nhất chỉ có tài khoản nào có mới đc
// id là duy nhất công khai, token thì không công khai