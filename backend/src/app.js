
const express = require("express");
const app = express();

app.use(express.json());
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const emailFormat = /^\S+@\S+\.\S+$/;
  if (!emailFormat.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  return res.status(201).json({
    token: "token",
  });
});


module.exports = app;


