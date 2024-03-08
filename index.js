const express = require("express");
const app = express();
const authorization = require("./src/middlewares/authorization.middleware.js");

app.use(authorization);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
