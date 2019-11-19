const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const restricted = require("../auth/restricted-middleware");
const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", (req, res) => {
  Users.findUsers()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: "failed to get nannies"
      });
    });
});

module.exports = router;
