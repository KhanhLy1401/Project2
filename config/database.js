const mongoose = require('mongoose');

module.exports.connect = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("success")
    } catch(error) {
        console.log("error");
    }
}
