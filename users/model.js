const DB = require("../database/connection");

function getAll() {
  return DB("users");
}

function getById(id) {
  return DB("users").where({ id }).first();
}

function getByUsername(username) {
  return DB("users").where({ username }).first();
}

function add(userInfo) {
  return DB("users")
    .insert(userInfo);
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  add
};
