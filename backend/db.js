//connection mongoose and mongodb
const mongoose= require('mongoose')
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoose Connected")
});
//schema
const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String
})
//connection mongoose with schema
const user = mongoose.model("user",userSchema)
module.exports = user;