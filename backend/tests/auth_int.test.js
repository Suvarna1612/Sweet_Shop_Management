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


it("should fail if email format is invalid", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "invalid-email",
      password: "password123"
    });

  expect(res.statusCode).toBe(400);
});



it("should fail if password is too weak", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "test@example.com",
      password: "123"
    });

  expect(res.statusCode).toBe(400);
});


it("should not allow registering with an existing email", async () => {
  const user = {
    name: "User One",
    email: "duplicate@example.com",
    password: "password123"
  };

  await request(app).post("/api/auth/register").send(user);

  const res = await request(app)
    .post("/api/auth/register")
    .send(user);

  expect(res.statusCode).toBe(409);
});


it("should not allow registering with an existing username", async () => {
  const user1 = {
    name: "testuser",
    email: "user1@example.com",
    password: "password123"
  };

  const user2 = {
    name: "testuser",
    email: "user2@example.com",
    password: "password123"
  };

  await request(app).post("/api/auth/register").send(user1);

  const res = await request(app)
    .post("/api/auth/register")
    .send(user2);

  expect(res.statusCode).toBe(409);
});









});
