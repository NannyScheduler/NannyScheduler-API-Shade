const db = require("../database/db-config");

module.exports = {
  findAllParents,
  findParentBy,
  addParent,
  findParentbyId,
  updateParent,
  removeParent
};

function findAllParents() {
  return db("parents");
}

function findParentBy(filter) {
  return db("parents").where(filter);
}

async function addParent(parent) {
  const [id] = await db("parents").insert(parent, "id");

  return findParentbyId(id);
}

function findParentbyId(id) {
  return db("parents")
    .where({ id })
    .first();
}

function updateParent(changes, id) {
  return db("parents")
    .where({ id })
    .update(changes);
}

function removeParent(id) {
  return db("parents")
    .where({ id })
    .del();
}
