exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("parents")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("parents").insert([
        {
          first_name: "Juye",
          last_name: "Young",
          email: "juye@gmail.com",
          phone: "+23138920932",
          address: "3 Lokoja Street, Lagos",
          user_id: 2
        },
        {
          first_name: "Tolu",
          last_name: "Tayo",
          email: "user@gmail.com",
          phone: "+2459809243",
          address: "15 Gill Road, Asaba",
          user_id: 1
        },
        {
          first_name: "Santos",
          last_name: "Olu",
          email: "santos@gmail.com",
          phone: "+2319302934",
          address: "51 Aba Road, Asaba",
          user_id: 3
        }
      ]);
    });
};
