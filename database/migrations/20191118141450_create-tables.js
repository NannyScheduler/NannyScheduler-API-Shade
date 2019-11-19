exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("email", 128)
        .unique()
        .notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("phone", 128).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("parents", tbl => {
      tbl.increments();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl
        .string("email", 128)
        .unique()
        .notNullable();
      tbl.string("phone", 128).notNullable();
      tbl.string("address", 128).notNullable();
      // tbl
      //   .foreign("user_id")
      //   .references("id")
      //   .inTable("users");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    })
    .createTable("nannies", tbl => {
      tbl.increments();
      tbl
        .string("email", 128)
        .unique()
        .notNullable();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("address", 128).notNullable();
      tbl.integer("hourly_rate").notNullable();
      tbl.boolean("can_drive").notNullable();
      tbl.string("phone", 128).notNullable();
      tbl.string("image_url");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    })

    .createTable("time", tbl => {
      tbl.increments();
      tbl.string("datetime").notNullable();
      tbl
        .integer("nanny_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("nannies");
    })

    .createTable("children", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.integer("age");
      tbl
        .integer("parent_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("parents");
    })

    .createTable("requests", tbl => {
      tbl.increments();
      tbl
        .integer("parent_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("parents");
      tbl
        .integer("nanny_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("nannies");
      tbl
        .integer("children_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("children");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("requests")
    .dropTableIfExists("children")
    .dropTableIfExists("time")
    .dropTableIfExists("nannies")
    .dropTableIfExists("parents")
    .dropTableIfExists("users");
};
