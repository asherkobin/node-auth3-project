const express = require("express");
const bcryptjs = require("bcryptjs");
const server = express();
const usersRouter = require("../users/router");
const usersModel = require("../users/model");
const verifyUser = require("./verifyUser");
const jwt = require("jsonwebtoken");

server.use(express.json());

server.use("/api/users", verifyUser, usersRouter);

server.post("/api/register", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json("[username] and [password] are required to register");
  }
  else {
    try {
      userInfo.password = bcryptjs.hashSync(userInfo.password, 8);
      
      res.status(201).json({ id: (await usersModel.add(userInfo))[0] });
    }
    catch (e) {
      if (e.code === "SQLITE_CONSTRAINT") {
        res.status(400).json("User " + userInfo.username + " is already registered");
      }
      else {
        res.status(500).json(e.toString());
      }
    }
  }
});

server.post('/api/login', async (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json("[username] and [password] are required to login");
  }
  else {
    try {
      const userInDb = await usersModel.getByUsername(userInfo.username);

      if (userInDb && bcryptjs.compareSync(userInfo.password, userInDb.password)) {
        res.status(200).json({
          token: generateToken(userInDb)
        });
      }
      else {
        res.status(401).json("Invalid Credentials");
      }
    }
    catch (e) {
      res.status(500).json(e.toString());
    }
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = require("./secrets").jwtSecret;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = server;
