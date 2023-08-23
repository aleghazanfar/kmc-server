const express = require("express")
const Products = require("../models/product")
const mongodb  = require("mongodb")

const router = express.Router()

//GET: Products
router.get("/", async (req, res) => {
    try {
        const products = await Products.find({})
        res.json(products);
    }
    catch (error) {
        console.log("Error:", err)

    }
})
//GET: Product By Id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const objectId = mongodb.ObjectId
        if (!objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid request Id" })
        }
        const product = await Products.findOne({ _id: id })
        if (product == null)
            return res.status(404).json({ message: "No Product Found" })
        else
        return res.status(200).json(product)

    }
    catch (error) {
        console.log(error);
    }
})
// POST: Products
router.post("/", async (req, res) => {
    try {
        const title = req.body.title
        const price = req.body.price
        const description = req.body.description
        const category = req.body.description
        const image = req.body.image
        const newProduct = new Products({
            title,
            price,
            description,
            category,
            image
        })
        newProduct.save().then(()=>{
            res.send({message:"Product is Created...."})
        }).catch((error)=>{
            res.status(500).json({message: "Failed to create Product:",error:error})
        })

    } catch (error) {
        console.log(error);

    }
})
module.exports = router