const express = require("express");
const zod = require("zod");
const cors = require("cors");
const User = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config(); //for configuring .env file

app.use(cors()); //for accept external api
app.use(express.json()); //for accept json file

const signupValidation = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

//for Sinup
app.post("/", async (req, resp) => {
  const body = req.body;
  const success = signupValidation.safeParse(body);
  if (!success) {
    return resp.status(411).json({ msg: "invalid inputs" });
  }
  try {
    const check = await User.findOne({
      email: body.email,
    });
    if (check) {
      return resp.status(403).json({
        msg: "email alredy exist",
      });
    }
    const response = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
    });
    const token = jwt.sign(response._id.toHexString(), process.env.SECRET);

    // toHexString   _id:"jshdjhdsjdfff" jshdjhdsjdfff nu "" ethto bahar kadan lei

    return resp.json({
      token: token,
    });
  } catch (err) {
    console.log(err)
    return resp.status(403).json({
      msg: "error while signing in",
    });
  }
});

//for login
app.listen("3000",()=>{
    console.log("port connected")
})
