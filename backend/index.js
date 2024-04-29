const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/user");
const blogRouter = require("./Routes/blog");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(6500, () => {
  console.log("port connected");
});
