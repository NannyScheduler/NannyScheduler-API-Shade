exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "user@gmail.com",
          password: "122445332",
          first_name: "Tolu",
          last_name: "Tayo",
          phone: "+2459809243"
        },
        {
          id: 2,
          email: "juye@gmail.com",
          password: "112233",
          first_name: "Juye",
          last_name: "Young",
          phone: "+23138920932"
        },
        {
          id: 3,
          email: "santos@gmail.com",
          password: "1234",
          first_name: "Santos",
          last_name: "Olu",
          phone: "+2319302934"
        },
        {
          id: 4,
          email: "sophie@gmail.com",
          password: "1234",
          first_name: "Sophie",
          last_name: "Moore",
          phone: "+23137720932"
        },
        {
          id: 5,
          email: "grace@gmail.com",
          password: "1234",
          first_name: "Grace",
          last_name: "Adeleke",
          phone: "+23137720911"
        },
        {
          id: 6,
          email: "ada@gmail.com",
          password: "1234",
          first_name: "Ada",
          last_name: "Okeke",
          phone: "+24137720911"
        }
      ]);
    });
};
