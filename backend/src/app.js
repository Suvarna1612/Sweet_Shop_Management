
const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/auth/register", (req, res) => {


    
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  return res.status(201).json({
    token: "token",
  });
});

module.exports = app;


