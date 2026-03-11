const jwt = require("jsonwebtoken");

// generate email verification token
const generateVerificationToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
};

// generate login authentication token
const generateAuthToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// ADD THIS: The middleware needs this to validate the token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateVerificationToken,
  generateAuthToken,
  verifyToken // MUST be exported here
};