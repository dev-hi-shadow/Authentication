const jwt = require("jsonwebtoken");
exports.generateJWTToken = (payload, expiresIn = 86400) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
  return token;
};
