const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  return res.status(201).json({
    token: "token"
  });
});

module.exports = app;
