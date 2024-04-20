const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mobile:mobile12@cluster0.7hhzq5p.mongodb.net/Blogapp")  //mongoose is a Scheme declared library of mdb
.then(()=>{
    console.log("Mongodb Connected")
})
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("user",userSchema)

module.exports = User;