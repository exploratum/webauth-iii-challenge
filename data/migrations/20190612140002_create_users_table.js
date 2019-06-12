
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 64).notNullable().unique();
        tbl.string('password', 1024).notNullable();
        tbl.string('department', 64).notNullable();  
      })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };

