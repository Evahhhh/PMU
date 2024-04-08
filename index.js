const express = require("express");
const app = express();
const authorization = require("./src/middlewares/authorization.middleware.js");
const userRoutes = require("./src/routes/user.js");

app.use(authorization);
app.use(express.json());
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
