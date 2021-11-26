const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3500, () => {
  console.log("The server is up and running on port ", 3500);
});
