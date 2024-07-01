const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"I need username bitch"]
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    description: String
});


// สร้างโมเดล ตัวแทนของ collection ใน DB
const Product = mongoose.model("products", productSchema)
// ส่งออกโมเดล
// ออกแบบฟังชันสำหรับบันทึกข้อมูล
module.exports = Product