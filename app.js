const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ text: "you hit main route", app: "natours" });
});

app.post("/", (req, res) => {
  res.status(200).send("you can post on this endpoint ");
});
app.get("/hello", (req, res) => {
  res.end("you hit hello route");
});
app.listen(port, () => {
  console.log("app running on port " + port);
});
