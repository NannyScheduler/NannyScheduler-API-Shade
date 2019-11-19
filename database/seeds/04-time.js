exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("time")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("time").insert([
        {
          datetime: "2019-11-11 13:00:00",
          nanny_id: 1
        },
        {
          datetime: "2019-11-11 14:00:00",
          nanny_id: 1
        },
        {
          datetime: "2019-11-11 15:00:00",
          nanny_id: 1
        },
        {
          datetime: "2019-11-11 10:00:00",
          nanny_id: 2
        },
        {
          datetime: "2019-11-11 11:00:00",
          nanny_id: 2
        },
        {
          datetime: "2019-11-11 12:00:00",
          nanny_id: 2
        },
        {
          datetime: "2019-11-11 13:00:00",
          nanny_id: 2
        },
        {
          datetime: "2019-11-11 16:00:00",
          nanny_id: 3
        },
        {
          datetime: "2019-11-11 17:00:00",
          nanny_id: 3
        },
        {
          datetime: "2019-11-11 18:00:00",
          nanny_id: 3
        },
        {
          datetime: "2019-11-11 19:00:00",
          nanny_id: 3
        },
        {
          datetime: "2019-11-11 20:00:00",
          nanny_id: 3
        }
      ]);
    });
};
