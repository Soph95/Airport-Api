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
    request(app)
      .post("/airports")
      .send(airport1)
      .expect(201)
      .end(() => {
        expect(airports[airports.length - 1]).toEqual(airport1);
        return done();
      });
  });
  test("retrieve a specific airport", async () => {
    const response = await request(app).get("/airports/00MO");
    expect(response.status).toBe(200);
  });
  test("update a specific airport", async () => {
    const updateAirport = {
      icao: "EXAS",
      iata: "",
      name: "Lowell Field",
      city: "Arizona",
      state: "Alaska",
      country: "US",
      elevation: 600,
      lat: 59.94919968,
      lon: -151.695999146,
      tz: "America/Anchorage",
    };
    const response = await request(app)
      .put("/airports/00MO")
      .send(updateAirport);
    expect(response.status).toBe(200);
  });
  test("delete a specific airport", async () => {
    const response = await request(app).delete("/airports/00AL");
    const deletedAirport = airports.filter(
      (airport) => airport.icao === "00AL"
    );
    expect(deletedAirport.length).toBe(0);
    expect(response.status).toBe(200);
  });
});
