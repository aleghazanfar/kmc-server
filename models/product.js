const mongoose = require("mongoose")

//product schema
const productsSchema = new mongoose.Schema({
tittle: String,
price: Number,
description: String,
category: String,
image:String,
rating:Object,
})
//Product Model model
const Products = mongoose.model('product', productsSchema)
module.exports= Products