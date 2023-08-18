const express = require("express")
const morgan = require("morgan")
const db=require("./config/db")
//Routes
const CategoryRoutes=require("./routes/category")
const ProductRoutes=require("./routes/product")

const port = 5000
const app = express()
app.use(morgan("dev"))
app.use(express.json())

//database connection
db.connect()
app.get("/", (req, res) => {
    res.send(`Server is runnig at ${port}...`)

})

//Categories Routes
app.use('/categories', CategoryRoutes)

//Products Routes
app.use('/products', ProductRoutes)

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})