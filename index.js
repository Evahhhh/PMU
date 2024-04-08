const express = require("express");
const app = express();
const authorization = require("./src/middlewares/authorization.middleware.js");
const socket = require('./src/socket.js');
const server = createServer(app);

socket(server)

app.use(authorization);

app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
