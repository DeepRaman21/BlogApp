const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User,Blog } = require("../db");
const sendEmail = require("../nodmailer");
const Auth = require("../Middleware/Auth");

require("dotenv").config();
const userRouter = express.Router();

const signupValidation = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

// for signup
userRouter.post("/create", async (req, resp) => {
  const body = req.body;
  const success = signupValidation.safeParse(body);
  if (!success) {
    return resp.status(411).json({ msg: "invalid inputs" });
  }
  const salt = await bcrypt.genSalt(5);
  const securpass = await bcrypt.hash(body.password, salt);
  try {
    const check = await User.findOne({
      email: body.email,
    });
    if (check) {
      return resp.status(403).json({ msg: "email already exist" });
    }
    const response = await User.create({
      firstname: body.firstName,
      lastname: body.lastName,
      username: body.userName,
      email: body.email,
      password: securpass,
    });
    const token = jwt.sign(response._id.toHexString(), process.env.SECRET);
    return resp.json({
      name: response.firstname,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return resp.status(403).json({ msg: "Error while Signing in" });
  }
});

//for login

userRouter.post("/login", async (req, resp) => {
  const body = req.body;
  const success = signupValidation.safeParse(body);
  if (!success) {
    return resp.status(411).json({ msg: "invalid inputs" });
  }
  try {
    const check = await User.findOne({
      email: body.email,
    });
    if (!check) {
      return resp.status(403).json({ msg: "email does not exist" });
    }
    const passcomp = await bcrypt.compare(body.password, check.password);
    if (passcomp) {
      const token = jwt.sign(check._id.toHexString(), process.env.SECRET);
      return resp.json({
        name: check.firstname,
        token: token,
      });
    } else {
      return resp.status(404).json({ error: "password does not matched" });
    }
  } catch (err) {
    console.log(err);
    return resp.status(403).json({ msg: "Error while Signing in" });
  }
});

//for OTP

userRouter.post("/otp", async (req, resp) => {
  const body = req.body;
  try {
    const check = await User.findOne({
      email: body.email,
    });
    if (!check) {
      return resp.status(404).json({ msg: "User Not Found" });
    }
    sendEmail(body)
      .then((response) => {
        resp.send(check.email);
      })
      .catch((response) => {
        resp.send(response.msg);
      });
  } catch (err) {
    console.log(err);
    return resp.status(403).json({ msg: "Error while Signing in" });
  }
});


//update Password

// userRouter.put("/update", async (req, resp) => {
//   const body = req.body;
//   const salt = await bcrypt.genSalt(5);
//   const securpass = await bcrypt.hash(body.password, salt);
//   try {
//     const response = await User.updateOne(
//       { email: body.email },
//       { password: securpass }
//     );
//     return resp.json({ msg: "password updated" });
//   } catch (err) {
//     return resp.status(404).json({ msg: "User Not Found" });
//   }
// });

userRouter.put("/newpass", async (req, res) => {
  const body = req.body;

  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email
  })

  if(check.password === body.password){
    return res.status(403).json({msg: "try new password"})
  }

  try {
    const response = await User.updateOne(
      { email: body.email },
      { password: securePass }
    );
    return res.json({ msg: "password updated" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "password error" });
  }
});

//for get user data 

userRouter.get("/userdata",Auth, async (req, res) => {
  try {
    const response = await User.findById(req.userId);
    const blogs = await Blog.find({
      userId: req.userId
    })
    return res.json({
      username: response.username,
      email: response.email,
      blogs
    });
  } catch (error) {
    console.log(error)
    return res.status(403).json({ msg: "error while getting blogs" });
  }
});
module.exports = userRouter;