const express = require("express");
const app = express();
require("dotenv").config();

//Connect to db
const sqlite3 = require("sqlite3").verbose();
const connection = new sqlite3.Database("./database/db.sqlite");

const userRoutes = require("./src/routes/user.js");
const roomRoutes = require("./src/routes/room.js");
const roundRoutes = require("./src/routes/round.js");
const betRoutes = require("./src/routes/bet.js");
const messageRoutes = require("./src/routes/message.js");
const gameRoutes = require("./src/routes/game.js");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  req.db = connection;
  next();
});

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/round", roundRoutes);
app.use("/api/bet", betRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/game", gameRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
