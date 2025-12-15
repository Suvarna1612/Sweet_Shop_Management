const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

beforeEach(async () => {
  // Clear all users from database before each test
  await User.deleteMany({});
});


describe("Auth Routes", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    console.log('Response status:', res.statusCode);
    console.log('Response body:', res.body);
    
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



// tests to check handling of login


describe("POST /api/auth/login", () => {

  it("should allow login with correct password even if stored hashed", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Hash Login",
        email: "hashlogin@test.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "hashlogin@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("token");
  });


  it("should store password in hashed form", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Hash User",
      email: "hash@test.com",
      password: "password123"
    });

  const savedUser = await User.findOne({ email: "hash@test.com" });

  expect(savedUser).toBeDefined();
  expect(savedUser.password).not.toBe("password123");
  expect(savedUser.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash pattern
});


  it("should fail if email is not registered", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nouser@test.com",
        password: "abc123"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should fail if password is incorrect", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Wrong Password User",
        email: "wrong@test.com",
        password: "abc123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "wrong123"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should fail if email or password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Email and password are required");
  });

  it("should not return password in response", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Secure User",
        email: "secure@test.com",
        password: "abc123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "secure@test.com",
        password: "abc123"
      });

    expect(res.body.password).toBeUndefined();
  });

});