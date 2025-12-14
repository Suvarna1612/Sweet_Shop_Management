const express = require("express");
const app = express();

app.use(express.json());


app.locals.users = [];


app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  const users = req.app.locals.users;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const emailFormat = /^\S+@\S+\.\S+$/;
  if (!emailFormat.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  if (name && users.find(u => u.name === name)) {
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }

  users.push({ email, password, name });

  res.status(201).json({
    success: true,
    token: "token",
  });
});

// tests to handle login functionality
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = req.app.locals.users;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    token: "token",
  });
});

module.exports = app;
