const express = require("express");
const advisorRoute = require("./router/advisor");
const userRoute = require("./router/user");
// App Config
const app = express();

// Middleware
app.use(express.json());
app.use(advisorRoute);
app.use(userRoute);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
// DB config
