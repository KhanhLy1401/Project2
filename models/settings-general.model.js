const mongoose = require("mongoose");
const settingGeneralSchema = new mongoose.Schema(
    {  
        websiteName: String,
        logo: String,
        phone: String,
        email: String,
        address: String,
        copyright: String
    },
    {
        timestamps: true
    }
)

const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, "settings-general")
module.exports = SettingGeneral

// token là string random giống id là duy nhất chỉ có tài khoản nào có mới đc
// id là duy nhất công khai, token thì không công khai