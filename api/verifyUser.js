const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const { authorization } = req.headers;
  const secret = require("./secrets").jwtSecret;

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json("Invalid Credentials");
      }
      else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } 
  else {
    res.status(400).json("No credentials provided");
  }
}

module.exports = verifyUser;
