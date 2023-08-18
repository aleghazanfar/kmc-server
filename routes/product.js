const express=require("express")
const Products=require("../models/product")

const router=express.Router()

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

module.exports=router