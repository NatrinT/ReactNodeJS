const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    type:{
        type:Number,
        required:true
    }
})

const Expense = mongoose.model('expenses',expenseSchema)

module.exports = Expense