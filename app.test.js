const app = require("./app");
const request = require("supertest");
const airportsJson = require("./airports.json");
const airports = require("./airports");

describe("My Airport server", () => {
  test("can GET all the airports", (done) => {
    request(app)
      .get("/airports")
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBeGreaterThan(28000);
      })
      .end(done);
  });
  test("create a new airport", (done) => {
    const airport1 = {
      icao: "ex12",
      iata: "",
      name: "Lowell Field",
      city: "Anchor Point",
      state: "Alaska",
      country: "US",
      elevation: 450,
      lat: 59.94919968,
      lon: -151.695999146,
      tz: "America/Anchorage",
    };
    // const airportsCopy = [...airportsJson];
    // airportsCopy.push(airport1);
    request(app)
      .post("/airports")
      .send(airport1)
      .expect(201)
      .end(() => {
        expect(airports[airports.length - 1]).toEqual(airport1);
        return done();
      });
  });
  test("retrieve a specific airport", (done) => {
    request(app).get("/airports/", (req, res) => {
      console.log(req.params);
      res.send(req.params);
    });
    // .expect(200)
    // .end(done);
  });
});
