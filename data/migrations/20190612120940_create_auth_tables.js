
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 32).notNullable().unique();
      tbl.string('password', 32).notNullable();
      tbl.string('department', 32).notNullable();  
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
