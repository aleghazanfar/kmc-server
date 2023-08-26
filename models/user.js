const mongoose = require("mongoose")

//Category schema
const userSchema = new mongoose.Schema({
   name: {type:String,required: true},
  email: { type: String, required: true, unqiue: true },
  password: {type:String,required: true}
  
})
//User model
const Users = mongoose.model('user', userSchema)

module.exports= Users