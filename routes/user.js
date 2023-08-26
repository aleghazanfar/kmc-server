const express = require("express")
const Users = require("../models/user")
const mongodb = require("mongodb")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()

//GET: Users
router.get("/", async (req, res) => {
    try {
        const users = await Users.find({})
        res.json(users);
    }
    catch (error) {
        console.log("Error:", err)

    }
})

// DELETE /User/:id
router.delete("/:id", async (req, res) => {
    try {
        // Todo: Check if id is valid
        const id = req.params.id

        const objectId = mongodb.ObjectId

        if (!objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User id" })
        }
        // Todo: Check if id exist
        const user = await Users.deleteOne({ _id: id })
        if (user == null) {
            return res.status(404).json({ message: "No User found" })
        }

        res.json(user)
    } catch (error) {
        console.log("Error: ", error)
    }
})

//Post:Create Users
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed password${hashedPassword}`)
        const newUser = new Users({
            name: name,
            email: email,
            password: hashedPassword
        })
        newUser.save().then(() => {
            res.send({ message: "User is created..." })
        }).catch((error) => {
            res.status(500).json({ message: "failed to create User:", error: error })
        })
    }
    catch (error) {
        console.log("Error:", error)
    }

})
//Login:
router.post("/login", async (req, res) => {
    try {
let{email,password}=req.body;
//check eather email is valid or not
const user=await users.findOne({email})
if(!user)
{
    res.status(404).json({message: "User not found"});
    return
}

//match password
const matchedPassword=await bcrypt.compare(password,user.password)
if(matchedPassword)
{
    const token=jwt.sign({userId:user._id},'jwt_token')
    let{email,name}=user
    res.json({name,email,token})
    console.log("User Logged In successfully")
}
else
{
    res.status(401).json({message: "Invalid Password"})
}

    }
    catch (error) {

        res.status(500).json({ message: "failed to login" })

    }
})
module.exports = router