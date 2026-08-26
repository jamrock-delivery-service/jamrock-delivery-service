const crypto = require("crypto");

function createToken(username) {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SECRET is not configured.");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(username)
    .digest("hex");
}

function verifyToken(username, token) {
  if (!token) return false;

  try {
    return createToken(username) === token;
  } catch {
    return false;
  }
}

module.exports = {
  createToken,
  verifyToken
};
