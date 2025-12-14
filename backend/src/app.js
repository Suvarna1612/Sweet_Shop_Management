const express = require("express");
const app = express();

app.use(express.json());


const users = [];

app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;


  // making sure that email and password are there and are in valid formats

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



  // checkuing for duplicate users


  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }


  if (name) {
    const nameExists = users.find(u => u.name === name);
    if (nameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }
  }

 
  users.push({ email, password, name });

  return res.status(201).json({
    success: true,
    token: "token",
  });
});

module.exports = app;
