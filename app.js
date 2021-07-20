const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

app.get("/airports", (req, res) => {
  res.json(airports);
});

app.post("/airports", (req, res) => {
  airports.push(req.body);
  console.log(airports);
  res.sendStatus(201);
});

module.exports = app;
