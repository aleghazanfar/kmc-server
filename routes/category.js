const express=require("express")
const mongodb = require("mongodb")
const Categories=require("../models/category")

const router=express.Router()

//GET: Categories
router.get("/", async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.json(categories);
    }
    catch (error) {
        console.log("Error:", err)

    }
})
//GET Categories by Id
router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    //const category=req.body
    // console.log(category)
    try {
        const title = req.body.title
        const imageUrl = req.body.imageUrl
        if(title=="")
        {
            return res.json({message:"Categroy Tittle is Required"})
        }
        const newCategory = new Categories({
            title,
            imageUrl
        })
        newCategory.save().then(() => {
            res.send({ message: "Category is created..." })
        }).catch((error) => {
            res.status(500).json({ message: "failed to create category:", error: error })
        })
    }
    catch (error) {
        console.log("Error:", error)
    }

})

module.exports=router