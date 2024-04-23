const { storage } = require("../db");
const express = require("express");
const zod = require("zod");
const { Blog } = require("../db");
const multer = require("multer");
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
blogRouter.post("/create", upload.single("filename"), async (req, resp) => {
  const body = req.body;
  console.log(req.file)
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
    console.log(storageRef)
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const DownloadURL = await getDownloadURL(snapshot.ref);
    console.log(DownloadURL)
    const blog = await Blog.create({
      title: body.title,
      description: body.description,
      img: DownloadURL,
    });
    return resp.json({ msg: "upload successfully" });
  } catch (error) {
    console.log(error)
    return resp.status(403).json({msg:"data nhi gea bckend ch"})
  }
});

blogRouter.get("/allblogs", async(req,res)=>{
  try {
    const response = await Blog.find({})
    return res.json({
      blog: response
    })
  } catch (error) {
    return res.status(403).json({msg: "error while fetching blogs"})
  }
})

module.exports = blogRouter;
