const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const mongodb = require("mongodb")

const port = 5000
const app = express()
app.use(morgan("dev"))


//default route
app.get("/", (req, res) => {
    res.send(`Server is runnig at ${port}...`)

})

//server confrimation on console
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})

//database connectivity
let MONGODB_URI = 'mongodb+srv://ghazanfar:ghazanfar02@nxb-projects.nptezba.mongodb.net/KMC-AA-db?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database is connected")
}).catch((err) => {
    console.log("Error in database connection", err)
})

// Category: define schema and model
const categoriesSchema = new mongoose.Schema({
    categoryName: String,
    imageUrl: String,
})
//category model
const Categories = mongoose.model('categories', categoriesSchema)

//GET: Categories
app.get("/categories", async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.json(categories);
    }
    catch (error) {
        console.log("Error:", err)

    }
})

//GET Categories by Id
app.get("/categories/:id", async (req, res) => {
    try {
        const id = req.params.id
        const objectId = mongodb.ObjectId
        if (!objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid request Id" })
        }
        const category = await Categories.find({ _id: id })
        if (category == null) {
            return res.status(404).json({ message: "No Category found" })
        }
        res.json(category)
    }
    catch (error) {
        console.log("Error:", error)
    }
})


//Post:Categories

app.post("/categories",async(req , res)=>{
    console.log(req.body)

})