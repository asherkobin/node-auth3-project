const knex = require("knex");
const knexfile = require("../knexfile");
const env = "development";

module.exports = knex(knexfile[env]);