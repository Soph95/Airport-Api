const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

app.get("/airports", (req, res) => {
  res.json(airports);
});

app.post("/airports", (req, res) => {
  airports.push(req.body);
  res.sendStatus(201);
});

// endpoint for getting a specific airport via its icao
app.get("/airports/:id", (req, res) => {
  const icao = req.params.id; // e.g. 00AO, 00AK
  const airportToReturn = airports.find((airport) => airport.icao === icao);
  if (airportToReturn) {
    res.json(airportToReturn);
  } else {
    res.sendStatus(404);
  }
});

app.put("/airports/:id", (req, res) => {
  const icao = req.params.id;
  const airportToUpdateIndex = airports.findIndex(
    (airport) => airport.icao === icao
  );
  airports[airportToUpdateIndex] = req.body;
  res.sendStatus(200);
});

app.delete("/airports/:id", (req, res) => {
  const icao = req.params.id;
  const airportToDelete = airports.find((airport) => airport.icao === icao);
  const index = airports.indexOf(airportToDelete);
  airports.splice(index, 1);
  res.sendStatus(200);
});
module.exports = app;
