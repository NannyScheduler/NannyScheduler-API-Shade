exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("nannies")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("nannies").insert([
        {
          email: "sophie@gmail.com",
          first_name: "Sophie",
          last_name: "Moore",
          address: "3 Igone Street, Lagos",
          hourly_rate: 1000,
          can_drive: true,
          phone: "+23137720932",
          image_url:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          user_id: 4
        },
        {
          email: "grace@gmail.com",
          first_name: "Grace",
          last_name: "Adeleke",
          address: "3 Marla Street, Benin",
          hourly_rate: 800,
          can_drive: false,
          phone: "+23137720911",
          image_url:
            "https://images.unsplash.com/photo-1503983469989-e2cbfd3bfeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          user_id: 5
        },
        {
          email: "ada@gmail.com",
          first_name: "Ada",
          last_name: "Okeke",
          address: "48 Abu Street, Benin",
          hourly_rate: 1100,
          can_drive: false,
          phone: "+24137720911",
          image_url:
            "https://images.unsplash.com/photo-1558622567-2adb5927265d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          user_id: 6
        }
      ]);
    });
};
