require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const port = process.env.PORT;
// const port = 5000;

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/posts", postRoutes);

server.use("/", (req, res) => {
  res.send("API running");
});

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
