const {initializeApp} =require ("firebase/app")
const {getStorage} =require("firebase/storage")
//connection mongoose and mongodb
const mongoose= require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoose Connected")
});
//firebase configrations
const firebaseConfig = {
    apiKey: "AIzaSyD1_eHVjTu0a6t-G73wOmlG6Zw-6H3DG-4",
    authDomain: "blogapp-d5f44.firebaseapp.com",
    projectId: "blogapp-d5f44",
    storageBucket: "blogapp-d5f44.appspot.com",
    messagingSenderId: "850387545094",
    appId: "1:850387545094:web:ee48dfc0ee90788ccbe787",
    measurementId: "G-EYVWRTCQRL"
  };
//schema
const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String
})
const app =initializeApp(firebaseConfig);
const storage = getStorage(app)
//connection mongoose with schema
const User = mongoose.model("user",userSchema)

const blogSchema = new mongoose.Schema({
    title:String,
    description:String,
    img:String
}) 
const Blog = mongoose.model("blog",blogSchema)

module.exports = {User,Blog,storage};

