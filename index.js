const express = require("express")
const morgan = require("morgan")
const cors=require("cors")
const db=require("./config/db")
//Routes
const CategoryRoutes=require("./routes/category")
const ProductRoutes=require("./routes/product")
const UserRoutes=require("./routes/user")

const port = process.env.PORT ||3000;
const host=process.env.HTTP_HOST || 'localhost';
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//database connection
db.connect()
app.get("/", (req, res) => {
    res.send(`Server is runnig at ${port}...`)

})

//Categories Routes
app.use('/categories', CategoryRoutes)

//Products Routes
app.use('/products', ProductRoutes)

//Users Routes
app.use('/users',UserRoutes)

app.listen(port,host, () => {
    console.log(`server is running at port ${port}`)
})