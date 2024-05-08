const { storage } = require("../db");
const express = require("express");
const zod = require("zod");
const { Blog } = require("../db");
const multer = require("multer");
const { User } = require("../db");
const Auth = require("../Middleware/Auth")
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
require("dotenv").config();
const blogRouter = express.Router();

const zodvalidation = zod.object({
  title: zod.string(),
  description: zod.string(),
});
const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single("filename")];

//api for blog

blogRouter.post("/create", multiple, async (req, resp) => {
  const body = req.body;
  const success = zodvalidation.safeParse(body);
  if (!success) {
    return resp.status(403).json({ msg: "Data invalid" });
  }
  try {
    const dataTime = Date.now();
    const storageRef = ref(
      storage,
      `${req.file.originalname + " " + dataTime}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const DownloadURL = await getDownloadURL(snapshot.ref);

    const author = await User.findById(req.userId);

    const blog = await Blog.create({
      title: body.title,
      description: body.description,
      img: DownloadURL,
      date: Date.now(),
      userId: req.userId,
      authorName: author.firstname,
    });
    return resp.json({ msg: "upload successfully" });
  } catch (error) {
    return resp.status(403).json({ msg: "Uploading Error" });
  }
});

// read all blogs
blogRouter.get("/allblogs", async (req, res) => {
  try {
    const response = await Blog.find({});
    return res.json({
      blog: response,
    });
  } catch (error) {
    return res.status(403).json({ msg: "error while fetching blogs" });
  }
});

//delete for blog
blogRouter.delete("/deleteblog",Auth , async (req, resp) => {
  const body = req.body;
  try {
    const check = await Blog.findById(req.id);
    if (check) {
      resp.status(403).json({ msg: "Deleted Error" });
    }
    const response = await Blog.deleteOne({
      _id: body.id,
    });
    resp.json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    resp.status(404).json({ msg: "Error while Deleting" });
  }
});

module.exports = blogRouter;
