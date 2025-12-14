const request = require("supertest");
const app = require("../src/app");

describe("Auth Routes", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });


  it(" if email is missing,it should fail", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ password: "password123" });

  expect(res.statusCode).toBe(400);
});


it("should fail if password is missing", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ email: "test@example.com" });

  expect(res.statusCode).toBe(400);
});



});
