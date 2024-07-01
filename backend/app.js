const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");

const Product = require('./model/Product')
const Expense = require('./model/Expense')

const app = express()
const router = express.Router()
const port = 5000

mongoose.connect('mongodb://127.0.0.1:27017/myDB')

// สำคัญมากๆ เมื่อจะทำการเชื่อมต่อ ระหว่าง b and f เพื่อกันการบล็อคจาก CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept')
    next()
})
app.use(express.json()) //เพื่อใช้ในการแปลงข้อมูล JSON ที่ส่งมาให้อัตโนมัติ
app.use(express.urlencoded({ extended: true })); // เปิดใช้งาน middleware สำหรับแปลง URL-encoded form data
app.use(cors());

app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/expense', async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.json(expenses)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
})

app.post('/insert', async (req, res) => {
    const { title, amount, description, type } = req.body

    try {
        const newExpense = new Expense(
            {
                title: title,
                amount: amount,
                description: description,
                type: type
            }
        );
        await newExpense.save();
        res.send('data: true');
    } catch (error) {
        console.log("Failed to", error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Expense.findByIdAndDelete(id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

app.put('/edit/:id' , async (req,res) => {
    try {
        const id = req.params.id
        await Expense.findByIdAndUpdate() 
    } catch (error) {
        
    }
})

app.listen(port, () => {
    `Server strating on port ${port}`
})