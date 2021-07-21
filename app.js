const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

app.get("/airports", (req, res) => {
  res.json(airports);
});

app.post("/airports", (req, res) => {
  airports.push(req.body);
  // console.log(airports);
  res.sendStatus(201);
});

// endpoint for getting a specific airport via its icao
app.get("/airports/:id", (req, res) => {
  const icao = req.params.id; // e.g. 00AO, 00AK
  const airportToReturn = airports.find((airport) => airport.icao === icao);
  // console.log(airportToReturn);
  res.json(airportToReturn);
});

app.put("/airports/:id", (req, res) => {
  const icao = req.params.id;
  const airportToUpdate = airports.find((airport) => airport.icao === icao);
  const index = airports.indexOf(airportToUpdate);
  airports[index] = req.body;
  console.log(airports[index]);
  res.sendStatus(200);
});

app.delete("/airports/:id", (req, res) => {
  const icao = req.params.id;
  const airportToDelete = airports.find((airport) => airport.icao === icao);
  const index = airports.indexOf(airportToDelete);
  console.log(airports.length);
  airports.splice(index, 1);
  console.log(airports.length);
  // res.json(`Airport ${icao} deleted`);
  res.sendStatus(200);
});
module.exports = app;
