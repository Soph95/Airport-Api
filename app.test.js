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
});
