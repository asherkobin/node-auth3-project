exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username", 255)
      .notNullable()
      .unique()
      .index();
    table
      .string("password", 255)
      .notNullable();
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
