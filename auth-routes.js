// JAMROCK DELIVERY SERVICE
// Authentication routes

const express = require("express");
const router = express.Router();

const auth = require("./auth-server");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return res.status(500).json({
      success: false,
      message: "Admin authentication is not configured."
    });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid login details."
    });
  }

  const token = auth.createToken(username);

  res.json({
    success: true,
    message: "Login successful.",
    token
  });
});

module.exports = router;
