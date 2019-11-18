exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "user@gmail.com",
          password: "122445332",
          is_admin: true
        },
        {
          id: 2,
          email: "admin@yahoo.com",
          password: "122432",
          is_admin: false
        },
        {
          id: 3,
          email: "goodfellas@gmail.com",
          password: "gonecuckoo",
          is_admin: true
        },
        {
          id: 4,
          email: "mailman@themail.com",
          password: 122445332,
          is_admin: false
        },
        {
          id: 5,
          email: "abandonhope@yewhoenter.com",
          password: "bruhhhhh",
          is_admin: true
        }
      ]);
    });
};
