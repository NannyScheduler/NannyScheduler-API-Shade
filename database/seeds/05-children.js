exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("children")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("children").insert([
        {
          name: "John",
          age: 12,
          parent_id: 1
        },
        {
          name: "Sade",
          age: 8,
          parent_id: 1
        },
        {
          name: "Chuks",
          age: 11,
          parent_id: 1
        },
        {
          name: "Tricia",
          age: 4,
          parent_id: 2
        },
        {
          name: "Nate",
          age: 12,
          parent_id: 2
        },
        {
          name: "Lucy",
          age: 6,
          parent_id: 3
        },
        {
          name: "Sayo",
          age: 7,
          parent_id: 3
        }
      ]);
    });
};
