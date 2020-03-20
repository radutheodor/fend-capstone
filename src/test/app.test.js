const request = require("supertest");
const app = require("../server/server.js");

describe("Test main application", () => {
  beforeAll(done => {
    done();
  });

  test("it should return succes on GET root", async done => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    done();
  });

  afterAll(done => {
    done();
  });
});
