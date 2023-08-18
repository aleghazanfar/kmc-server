const mongoose = require("mongoose")


const dotenv = require("dotenv")
dotenv.config();
 //let MONGODB_URI = 'mongodb+srv://ghazanfar:ghazanfar02@nxb-projects.nptezba.mongodb.net/KMC-AA-db?retryWrites=true&w=majority'
 //let MONGODB_URI = 'mongodb://127.0.0.1:27017/KMC-AA?retryWrites=true&w=majority'

 
// mongoose.connect(MONGODB_URI).then(() => {
//     console.log("Database is connected")
// }).catch((err) => {
//     console.log("Error in database connection", err)
// })
module.exports={

    connect:function(){
        
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Database is connected")
           }).catch((err) => {
            console.log("Error in database connection", err)
        })
    }
}
