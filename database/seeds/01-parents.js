
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents').del()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {id: 1, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 1},
        {id: 2, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 2},
        {id: 3, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 3},
        {id: 4, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 4},
        {id: 5, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 5},
        {id: 6, fname: 'Jason', lname: 'Statham', address: 'Transporter Station, Somwehere in London', phone: '+25485869484', parent_id: 6},
      ]);
    });
};
