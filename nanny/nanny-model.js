const db = require("../database/db-config");

module.exports = {
  findAllNannies,
  findNannyBy,
  addNanny,
  findNannyById,
  updateNanny,
  removeNanny
};

function findAllNannies() {
  return db("nannies");
}

function findNannyBy(filter) {
  return db("nannies").where(filter);
}

async function addNanny(nanny) {
  const [id] = await db("nannies").insert(nanny, "id");

  return findNannyById(id);
}

// function addNanny(nanny) {
//   return db("nannies")
//     .insert(nanny, "id")
//     .then(ids => {
//       const [id] = ids;
//       return findNannyById(id);
//     });
// }

function findNannyById(id) {
  return db("nannies")
    .where({ id })
    .first();
}

function updateNanny(changes, id) {
  return db("nannies")
    .where({ id })
    .update(changes);
}

function removeNanny(id) {
  return db("nannies")
    .where({ id })
    .del();
}
