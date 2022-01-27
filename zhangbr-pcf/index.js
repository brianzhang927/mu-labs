// following code taken from https://www.npmjs.com/package/express
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
