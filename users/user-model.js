const db = require("../database/db-config");

module.exports = {
  findUsers,
  findUserBy,
  addUser,
  findUserById
};

function findUsers() {
  return db("users");
}

function findUserBy(filter) {
  return db("users").where(filter);
}

async function addUser(user) {
  const [id] = await db("users").insert(user, "id");

  return findUserById(id);
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}
