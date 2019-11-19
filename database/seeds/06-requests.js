exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("requests")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("requests").insert([
        {
          parent_id: 1,
          nanny_id: 2,
          children_id: 1,
          special_notes: "Kindly know that we have a pet at home"
        },
        {
          parent_id: 2,
          nanny_id: 1,
          children_id: 4
        },
        {
          parent_id: 3,
          nanny_id: 3,
          children_id: 6
        }
      ]);
    });
};
