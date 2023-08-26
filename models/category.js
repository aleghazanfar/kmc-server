const mongoose = require("mongoose")

//Category schema
const categoriesSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
})
//category model
const Categories = mongoose.model('category', categoriesSchema)

module.exports= Categories