const User = require("../src/models/User");

describe("User Model", () => {

  it("should create a user successfully with valid data", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe("user"); 
  });

  it("should fail if required fields are missing", async () => {
    const user = new User({});

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  it("should not allow duplicate email", async () => {
    const userData = {
      name: "User One",
      email: "duplicate@example.com",
      password: "password123"
    };

    await User.create(userData);

    let err;
    try {
      await User.create(userData);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    // used to check for avoiding duplicate values

    expect(err.code).toBe(11000); // Mongo duplicate key error- 11000 is indicating that
  });

});
