module.exports = {
  jwtSecret: process.env.JWT_SECRET
}

if (!module.exports.jwtSecret) {
  throw new Error("No JWT_SECRET Defined");
}