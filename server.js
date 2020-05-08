const express = require("express");

const app = express();
const path = require("path");

app.use(express.static("./dist/todo-list"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/todo-list/index.html"));
});

app.listen(process.env.PORT || 8080);
